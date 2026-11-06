'use client';

import { useEffect, useRef } from 'react';

/**
 * Paints a same-origin image onto a canvas so the page has no <img> to
 * right-click, drag, or open. Same idea as the web app's cover canvas,
 * without encryption: screenshots still work, the file is not an image element.
 */
function blockSave(event: { preventDefault: () => void }) {
  event.preventDefault();
}

function drawCover(
  canvas: HTMLCanvasElement,
  image: CanvasImageSource,
  sourceWidth: number,
  sourceHeight: number,
) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (!width || !height || !sourceWidth || !sourceHeight) return;

  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.max(1, Math.round(width * ratio));
  canvas.height = Math.max(1, Math.round(height * ratio));

  const context = canvas.getContext('2d');
  if (!context) return;
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = 'high';
  context.clearRect(0, 0, canvas.width, canvas.height);

  const scale = Math.max(canvas.width / sourceWidth, canvas.height / sourceHeight);
  const drawWidth = sourceWidth * scale;
  const drawHeight = sourceHeight * scale;
  context.drawImage(
    image,
    (canvas.width - drawWidth) / 2,
    (canvas.height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  );
}

export function ProtectedImage({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !src) return;

    const block = (event: Event) => event.preventDefault();
    canvas.addEventListener('contextmenu', block);
    canvas.addEventListener('dragstart', block);
    canvas.addEventListener('copy', block);

    let cancelled = false;
    const image = new Image();
    image.decoding = 'async';

    const paint = () => {
      if (cancelled || !canvasRef.current || !image.naturalWidth) return;
      drawCover(
        canvasRef.current,
        image,
        image.naturalWidth,
        image.naturalHeight,
      );
    };

    image.onload = paint;
    image.src = src;

    const observer = new ResizeObserver(paint);
    observer.observe(canvas);

    return () => {
      cancelled = true;
      image.onload = null;
      observer.disconnect();
      canvas.removeEventListener('contextmenu', block);
      canvas.removeEventListener('dragstart', block);
      canvas.removeEventListener('copy', block);
    };
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt || undefined}
      className={`pointer-events-auto absolute inset-0 h-full w-full select-none [-webkit-touch-callout:none] ${className}`}
      draggable={false}
      onContextMenu={blockSave}
      onDragStart={blockSave}
      onCopy={blockSave}
    />
  );
}
