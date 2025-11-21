import { createTracingCanvas, createTracingDataUrl } from "./tracing-renderer"

// =======================================================
// 🚀 A4 FULL-BLEED PRO MODE (NO DISTORTION, NO WHITE EDGES)
// =======================================================
export async function convertToA4(imageUrl: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const A4_WIDTH = 2480;  // A4 @ 300 DPI
        const A4_HEIGHT = 3508;

        const canvas = document.createElement("canvas");
        canvas.width = A4_WIDTH;
        canvas.height = A4_HEIGHT;

        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, A4_WIDTH, A4_HEIGHT);

        // FULL-BLEED CENTER CROP (NO DISTORTION)
        const scale = Math.max(A4_WIDTH / img.width, A4_HEIGHT / img.height);
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;

        const offsetX = (A4_WIDTH - newWidth) / 2;
        const offsetY = (A4_HEIGHT - newHeight) / 2;

        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        resolve(canvas.toDataURL("image/jpeg", 0.98));
      };

      img.onerror = () => reject("Failed to load image");
      img.src = imageUrl;
    } catch (err) {
      reject(err);
    }
  });
}

// =======================================================
// 🚀 A4 CANVAS FULL-BLEED CONVERTER
// =======================================================
export async function convertCanvasToA4(canvas: HTMLCanvasElement): Promise<HTMLCanvasElement> {
  const A4_WIDTH = 2480;
  const A4_HEIGHT = 3508;

  const a4Canvas = document.createElement("canvas");
  a4Canvas.width = A4_WIDTH;
  a4Canvas.height = A4_HEIGHT;

  const ctx = a4Canvas.getContext("2d")!;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, A4_WIDTH, A4_HEIGHT);

  // FULL-BLEED CENTER CROP
  const scale = Math.max(A4_WIDTH / canvas.width, A4_HEIGHT / canvas.height);
  const newWidth = canvas.width * scale;
  const newHeight = canvas.height * scale;

  const offsetX = (A4_WIDTH - newWidth) / 2;
  const offsetY = (A4_HEIGHT - newHeight) / 2;

  ctx.drawImage(canvas, offsetX, offsetY, newWidth, newHeight);

  return a4Canvas;
}

// =======================================================
// 🚀 DOWNLOAD A4 IMAGE
// =======================================================
export const downloadImageA4 = async (imageUrl: string, filename: string) => {
  const a4DataUrl = await convertToA4(imageUrl);
  downloadImage(a4DataUrl, filename);
};

// =======================================================
// 🚀 PRINT A4 IMAGE
// =======================================================
export const printImageA4 = async (imageUrl: string, title: string) => {
  const a4DataUrl = await convertToA4(imageUrl);
  printImage(a4DataUrl, title);
};

// =======================================================
// 🚀 UNIVERSAL DOWNLOADER
// =======================================================
export const downloadImage = (imageUrl: string, filename: string) => {
  if (imageUrl.startsWith("data:")) {
    fetch(imageUrl)
      .then(res => res.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 100);
      })
      .catch(() => {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
  } else {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

// =======================================================
// 🚀 DOWNLOAD CANVAS
// =======================================================
export const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// =======================================================
// 🚀 TRACING TEMPLATE → A4 DOWNLOAD
// =======================================================
export const downloadTracingTemplate = async (
  content: string,
  filename: string,
  width?: number,
  height?: number
) => {
  const canvas = createTracingCanvas(content, width, height);
  const a4Canvas = await convertCanvasToA4(canvas);
  downloadCanvas(a4Canvas, filename);
};

// =======================================================
// 🚀 TRACING TEMPLATE → A4 PRINT
// =======================================================
export const printContent = async (content: string, title: string) => {
  const canvas = createTracingCanvas(content);
  const a4Canvas = await convertCanvasToA4(canvas);
  const dataUrl = a4Canvas.toDataURL("image/jpeg", 0.98);
  printImage(dataUrl, title);
};

// =======================================================
// 🚀 FULL-BLEED A4 PRINT — PERFECT FIT
// =======================================================
export const printImage = (imageUrl: string, title: string) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  printWindow.document.open();
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 0;
          }

          html, body {
            width: 210mm;
            height: 297mm;
            padding: 0;
            margin: 0;
            background: white;
            overflow: hidden;
          }

          img {
            width: 100%;
            height: 100%;
            object-fit: fill;
            display: block;
          }
        </style>
      </head>
      <body>
        <img id="print-img" src="${imageUrl}" />
      </body>
    </html>
  `);
  printWindow.document.close();

  // ⭐ WAIT FOR POPUP DOCUMENT TO BE READY
  const interval = setInterval(() => {
    const img = printWindow.document.getElementById("print-img") as HTMLImageElement;
    if (!img) return;

    if (img.complete) {
      clearInterval(interval);

      // ⭐ PRINT ONLY AFTER IMAGE LOADS
      printWindow.focus();
      printWindow.print();

      // ⭐ AUTO-CLOSE popup after printing
      printWindow.onafterprint = () => printWindow.close();
    }
  }, 50);
};

