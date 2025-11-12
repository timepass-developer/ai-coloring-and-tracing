const DEFAULT_CANVAS_WIDTH = 1000;
const DEFAULT_CANVAS_HEIGHT = 700;

export interface TracingRenderOptions {
  width?: number;
  height?: number;
  backgroundColor?: string;
  letterStrokeColor?: string;
  letterStrokeWidth?: number;
  letterDash?: number[];
  practiceLineCount?: number;
  practiceLineColor?: string;
  practiceLineDash?: number[];
  marginRatio?: number;
  fontFamily?: string;
  letterCase?: "upper" | "lower" | "original";
}

const DEFAULT_OPTIONS: Required<Omit<TracingRenderOptions, "width" | "height">> = {
  backgroundColor: "#ffffff",
  letterStrokeColor: "#d4d4d8",
  letterStrokeWidth: 12,
  letterDash: [18, 16],
  practiceLineCount: 3,
  practiceLineColor: "#d4d4d8",
  practiceLineDash: [12, 12],
  marginRatio: 0.14,
  fontFamily: "'Fredoka', 'Arial', sans-serif",
  letterCase: "original",
};

export function drawTracingTemplate(
  ctx: CanvasRenderingContext2D,
  content: string,
  options: TracingRenderOptions = {}
): void {
  const width = options.width ?? ctx.canvas.width;
  const height = options.height ?? ctx.canvas.height;

  const {
    backgroundColor,
    letterStrokeColor,
    letterStrokeWidth,
    letterDash,
    practiceLineCount,
    practiceLineColor,
    practiceLineDash,
    marginRatio,
    fontFamily,
    letterCase,
  } = { ...DEFAULT_OPTIONS, ...options };

  const sanitizedContent =
    letterCase === "upper"
      ? content.toUpperCase()
      : letterCase === "lower"
        ? content.toLowerCase()
        : content;

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);

  // Render tracing character(s)
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.strokeStyle = letterStrokeColor;
  ctx.setLineDash(letterDash);

  let fontSize = Math.min(width, height) * 0.48;
  ctx.font = `bold ${fontSize}px ${fontFamily}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const maxWidth = width * 0.78;
  const minFontSize = Math.min(width, height) * 0.15;

  while (ctx.measureText(sanitizedContent).width > maxWidth && fontSize > minFontSize) {
    fontSize -= 4;
    ctx.font = `bold ${fontSize}px ${fontFamily}`;
  }

  const dynamicStrokeWidth = Math.max(letterStrokeWidth, fontSize * 0.18);
  ctx.lineWidth = dynamicStrokeWidth;

  const letterYOffset = fontSize * 0.1;
  ctx.strokeText(sanitizedContent, width / 2, height * 0.4 + letterYOffset);

  ctx.setLineDash([]);

  // Render practice lines
  const lines = Math.max(0, practiceLineCount);
  if (lines > 0) {
    ctx.strokeStyle = practiceLineColor;
    ctx.setLineDash(practiceLineDash);
    ctx.lineWidth = Math.max(2, dynamicStrokeWidth * 0.35);

    const margin = width * marginRatio;
    const startY = height * 0.66;
    const spacing = Math.min(height * 0.12, 90);

    for (let i = 0; i < lines; i++) {
      const y = startY + i * spacing;
      if (y > height - spacing * 0.3) break;
      ctx.beginPath();
      ctx.moveTo(margin, y);
      ctx.lineTo(width - margin, y);
      ctx.stroke();
    }
  }

  ctx.restore();
}

export function createTracingCanvas(
  content: string,
  width = DEFAULT_CANVAS_WIDTH,
  height = DEFAULT_CANVAS_HEIGHT,
  options: TracingRenderOptions = {}
): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const scale =
    typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1;

  canvas.width = Math.round(width * scale);
  canvas.height = Math.round(height * scale);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Unable to acquire 2D context for tracing canvas");
  }

  ctx.scale(scale, scale);
  drawTracingTemplate(ctx, content, { width, height, ...options });

  return canvas;
}

export function createTracingDataUrl(
  content: string,
  width = DEFAULT_CANVAS_WIDTH,
  height = DEFAULT_CANVAS_HEIGHT,
  options: TracingRenderOptions = {}
): string {
  const canvas = createTracingCanvas(content, width, height, options);
  return canvas.toDataURL("image/png", 0.92);
}

