import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_TEXT = 10_000;
// Vercel rejects function request bodies over ~4.5MB before this handler runs.
const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;
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

type SlackApiResponse = { ok: boolean; error?: string; [key: string]: unknown };

async function slackApi(token: string, method: string, body: Record<string, string>): Promise<SlackApiResponse> {
  const response = await fetch(`https://slack.com/api/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body),
  });
  if (!response.ok) return { ok: false, error: `http_${response.status}` };
  return (await response.json()) as SlackApiResponse;
}

async function uploadToSlackThread(
  token: string,
  channel: string,
  threadTs: string,
  file: File,
): Promise<string | null> {
  const bytes = new Uint8Array(await file.arrayBuffer());
  const filename = file.name || "attachment";

  const ticket = await slackApi(token, "files.getUploadURLExternal", {
    filename,
    length: String(bytes.byteLength),
  });
  if (!ticket.ok || typeof ticket.upload_url !== "string" || typeof ticket.file_id !== "string") {
    return ticket.error || "upload_url_failed";
  }

  const upload = await fetch(ticket.upload_url, {
    method: "POST",
    headers: { "Content-Type": file.type || "application/octet-stream" },
    body: bytes,
  });
  if (!upload.ok) return `upload_http_${upload.status}`;

  const complete = await slackApi(token, "files.completeUploadExternal", {
    files: JSON.stringify([{ id: ticket.file_id, title: filename }]),
    channel_id: channel,
    thread_ts: threadTs,
  });
  return complete.ok ? null : complete.error || "complete_upload_failed";
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

  let attachment: File | null = null;
  const file = form.get("attachment");
  if (file && typeof file === "object" && "arrayBuffer" in file && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json({ error: "Attachment too large (max 4MB)." }, { status: 413 });
    }
    const mime = file.type || "application/octet-stream";
    if (!mime.startsWith("image/") && !mime.startsWith("video/")) {
      return NextResponse.json({ error: "Attachment must be an image or video." }, { status: 400 });
    }
    attachment = file;
  }
  const attachmentName = attachment ? attachment.name || "attachment" : null;

  const botToken = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.SLACK_BUG_REPORT_CHANNEL_ID;
  const webhook = process.env.SLACK_BUG_REPORT_WEBHOOK_URL;
  const useBot = Boolean(botToken && channel);
  if (!useBot && !webhook) {
    console.error("Bug reports need SLACK_BOT_TOKEN + SLACK_BUG_REPORT_CHANNEL_ID, or SLACK_BUG_REPORT_WEBHOOK_URL");
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
              attachment && attachmentName
                ? useBot
                  ? `Attachment: \`${slackEscape(attachmentName)}\` (${attachment.size} bytes), uploaded in this thread.`
                  : `Attachment named on the form: \`${slackEscape(attachmentName)}\` (${attachment.size} bytes). Not delivered: set SLACK_BOT_TOKEN to upload files.`
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

  if (useBot && botToken && channel) {
    let threadTs: string;
    try {
      const posted = await slackApi(botToken, "chat.postMessage", {
        channel,
        text: payload.text,
        blocks: JSON.stringify(payload.blocks),
        unfurl_links: "false",
      });
      if (!posted.ok || typeof posted.ts !== "string") {
        console.error("Slack chat.postMessage failed", posted.error);
        return NextResponse.json({ error: "Failed to submit bug report" }, { status: 502 });
      }
      threadTs = posted.ts;
    } catch (error) {
      console.error("Slack chat.postMessage request failed", error);
      return NextResponse.json({ error: "Failed to submit bug report" }, { status: 502 });
    }

    if (attachment) {
      try {
        const uploadError = await uploadToSlackThread(botToken, channel, threadTs, attachment);
        if (uploadError) {
          console.error("Slack attachment upload failed", uploadError);
          await slackApi(botToken, "chat.postMessage", {
            channel,
            thread_ts: threadTs,
            text: `Attachment upload failed (${uploadError}).`,
          }).catch(() => undefined);
          return NextResponse.json({ ok: true, id, attachmentDelivered: false });
        }
      } catch (error) {
        console.error("Slack attachment upload request failed", error);
        return NextResponse.json({ ok: true, id, attachmentDelivered: false });
      }
    }

    return NextResponse.json({ ok: true, id, attachmentDelivered: attachment ? true : undefined });
  }

  try {
    const response = await fetch(webhook as string, {
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

  return NextResponse.json({ ok: true, id, attachmentDelivered: attachment ? false : undefined });
}
