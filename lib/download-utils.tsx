import { createTracingCanvas, createTracingDataUrl } from "./tracing-renderer"

export const downloadImage = (imageUrl: string, filename: string) => {
  // Handle base64 data URLs by converting to blob for better browser compatibility
  if (imageUrl.startsWith("data:")) {
    try {
      // Convert base64 to blob
      const response = fetch(imageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const url = URL.createObjectURL(blob)
          const link = document.createElement("a")
          link.href = url
          link.download = filename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          // Clean up the object URL
          setTimeout(() => URL.revokeObjectURL(url), 100)
        })
        .catch((error) => {
          console.error("Error downloading base64 image:", error)
          // Fallback to direct download
          const link = document.createElement("a")
          link.href = imageUrl
          link.download = filename
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
    } catch (error) {
      console.error("Error processing base64 image:", error)
      // Fallback to direct download
      const link = document.createElement("a")
      link.href = imageUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  } else {
    // For regular URLs, use direct download
    const link = document.createElement("a")
    link.href = imageUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

export const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
  const link = document.createElement("a")
  link.download = filename
  link.href = canvas.toDataURL("image/png")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const downloadTracingTemplate = (
  content: string,
  filename: string,
  width?: number,
  height?: number
) => {
  const canvas = createTracingCanvas(content, width, height)
  downloadCanvas(canvas, filename)
}

export const printContent = (content: string, title: string) => {
  const dataUrl = createTracingDataUrl(content)
  printImage(dataUrl, title)
}

export const printImage = (imageUrl: string, title: string) => {
  const printWindow = window.open("", "_blank")
  if (!printWindow) return

  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body {
            margin: 0;
            padding: 20px;
            text-align: center;
            background: white;
          }
          img {
            max-width: 100%;
            height: auto;
            border: 2px solid #ddd;
            border-radius: 10px;
            box-shadow: 0 0 8px rgba(0,0,0,0.1);
          }
          @media print {
            body { margin: 10px; }
          }
        </style>
      </head>
      <body>
        <img id="printImage" src="${imageUrl}" alt="${title}" />
      </body>
    </html>
  `)

  const img = printWindow.document.getElementById("printImage") as HTMLImageElement

  img.onload = () => {
    printWindow.focus()
    printWindow.print()
    printWindow.onafterprint = () => printWindow.close()
  }

  img.onerror = () => {
    alert("Failed to load the image for printing.")
    printWindow.close()
  }

  printWindow.document.close()
}
