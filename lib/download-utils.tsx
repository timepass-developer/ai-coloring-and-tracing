export const downloadImage = (imageUrl: string, filename: string) => {
  const link = document.createElement("a")
  link.href = imageUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
  const link = document.createElement("a")
  link.download = filename
  link.href = canvas.toDataURL("image/png")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const printContent = (content: string, title: string) => {
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title}</title>
          <style>
            body {
              margin: 0;
              padding: 40px;
              text-align: center;
              font-family: 'Arial', sans-serif;
              background: white;
            }
            .header {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 40px;
              color: #333;
            }
            .content {
              font-size: 200px;
              color: #ddd;
              font-weight: bold;
              -webkit-text-stroke: 2px #ccc;
              text-stroke: 2px #ccc;
              margin: 40px 0;
            }
            .practice-lines {
              border-top: 2px dashed #ccc;
              margin: 40px 0;
              height: 80px;
            }
            @media print {
              body { margin: 20px; }
              .content { font-size: 150px; }
            }
          </style>
        </head>
        <body>
          <div class="header">${title}</div>
          <div class="content">${content}</div>
          <div class="practice-lines"></div>
          <div class="practice-lines"></div>
          <div class="practice-lines"></div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }
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

  // Wait until image loads
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
