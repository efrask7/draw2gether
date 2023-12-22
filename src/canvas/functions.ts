import { canvas, ctx } from ".";

function getCanvaImage() {
  const imageURL = canvas.toDataURL()
  return imageURL
}

function startCanva() {
  ctx.beginPath()
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, 800, 600)
}

export { getCanvaImage, startCanva }
