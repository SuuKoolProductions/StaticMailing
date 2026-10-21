import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_TEXT = 10_000;
const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
const SEVERITIES = new Set(["blocker", "major", "minor"]);
const AREAS = new Set([
  "upload",
  "player",
  "subtitles",
  "tagging",
  "auth",
  "payments",
  "wallet",
  "explore",
  "other",
]);

const recentReports = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

function clampText(value: FormDataEntryValue | null, max = MAX_TEXT): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

function parseIntSafe(value: FormDataEntryValue | null): number | null {
  if (typeof value !== "string") return null;
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : null;
}

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const first = forwarded?.split(",")[0]?.trim();
  return first || req.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (recentReports.get(ip) || []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    recentReports.set(ip, recent);
    return true;
  }
  recent.push(now);
  recentReports.set(ip, recent);
  return false;
}

function slackEscape(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many reports. Try again in a minute." }, { status: 429 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const title = clampText(form.get("title"), 200);
  const happened = clampText(form.get("happened"));
  const expected = clampText(form.get("expected"));
  const stepsToReproduce = clampText(form.get("stepsToReproduce"));
  const severity = String(form.get("severity") || "").toLowerCase();
  const area = clampText(form.get("area"), 80)?.toLowerCase() || "other";

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }
  if (!SEVERITIES.has(severity)) {
    return NextResponse.json({ error: "Severity is invalid" }, { status: 400 });
  }
  if (!AREAS.has(area)) {
    return NextResponse.json({ error: "Area is invalid" }, { status: 400 });
  }

  const url = clampText(form.get("url"), 1000);
  const userAgent = clampText(form.get("userAgent"), 2000) || req.headers.get("user-agent");
  const viewportW = parseIntSafe(form.get("viewportW"));
  const viewportH = parseIntSafe(form.get("viewportH"));
  const source = clampText(form.get("source"), 64) || "page";
  const commitHash = process.env.VERCEL_GIT_COMMIT_SHA || null;

  let attachmentName: string | null = null;
  let attachmentSize: number | null = null;
  const file = form.get("attachment");
  if (file && typeof file === "object" && "arrayBuffer" in file && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json(
        { error: `Attachment too large (max ${MAX_ATTACHMENT_BYTES} bytes)` },
        { status: 413 },
      );
    }
    const mime = file.type || "application/octet-stream";
    if (!mime.startsWith("image/") && !mime.startsWith("video/")) {
      return NextResponse.json({ error: "Attachment must be an image or video" }, { status: 400 });
    }
    attachmentName = file.name || "attachment";
    attachmentSize = file.size;
  }

  const webhook = process.env.SLACK_BUG_REPORT_WEBHOOK_URL;
  if (!webhook) {
    console.error("Missing SLACK_BUG_REPORT_WEBHOOK_URL");
    return NextResponse.json({ error: "Failed to submit bug report" }, { status: 500 });
  }

  const id = randomUUID();
  const prettySeverity = severity.toUpperCase();
  const section = (label: string, value: string) => ({
    type: "section",
    text: { type: "mrkdwn", text: `*${label}*\n${slackEscape(value).slice(0, 2500)}` },
  });

  const payload = {
    text: `New bug report (${prettySeverity}) - ${title}`,
    blocks: [
      {
        type: "header",
        text: { type: "plain_text", text: "New bug report", emoji: true },
      },
      {
        type: "section",
        fields: [
          { type: "mrkdwn", text: `*Severity*\n${prettySeverity}` },
          { type: "mrkdwn", text: `*Area*\n${slackEscape(area)}` },
          { type: "mrkdwn", text: `*Report ID*\n\`${id}\`` },
          { type: "mrkdwn", text: "*Site*\nshobble.com" },
        ],
      },
      ...(url ? [section("URL", url)] : []),
      section("Title", title),
      ...(stepsToReproduce ? [section("Steps to reproduce", stepsToReproduce)] : []),
      ...(happened ? [section("What happened", happened)] : []),
      ...(expected ? [section("Expected", expected)] : []),
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: [
              `Source: \`${slackEscape(source)}\``,
              userAgent ? `Browser: ${slackEscape(userAgent).slice(0, 300)}` : null,
              viewportW && viewportH ? `Viewport: ${viewportW}x${viewportH}` : null,
              attachmentName
                ? `Attachment named on the form: \`${slackEscape(attachmentName)}\` (${attachmentSize || 0} bytes). This site does not store the file.`
                : null,
              commitHash ? `Commit: \`${slackEscape(commitHash)}\`` : null,
            ]
              .filter(Boolean)
              .join("\n"),
          },
        ],
      },
    ],
  };

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      console.error("Slack bug report webhook failed", response.status);
      return NextResponse.json({ error: "Failed to submit bug report" }, { status: 502 });
    }
  } catch (error) {
    console.error("Slack bug report webhook request failed", error);
    return NextResponse.json({ error: "Failed to submit bug report" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, id });
}
