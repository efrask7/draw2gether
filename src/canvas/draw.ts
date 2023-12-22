import { ctx } from "."
import { getCircleRadio, getRectSize } from "./math"
import { IDrawProps, TPos } from "./types"

function drawPoint({ x, y, eraser, settings }: IDrawProps) {
  const canva = ctx
  const { size, color } = settings

  // canva.beginPath()
  // canva.lineWidth = size
  // canva.lineJoin = canva.lineCap = "round"
  // canva.strokeStyle = eraser ? "#ffffff" : color
  // canva.lineTo(x, y)
  // canva.stroke()
  canva.fillStyle = eraser ? "#ffffff" : color
  canva.fillRect(x, y, size, size)
}

function drawLine({ x, y, holding: holdClient, settings }: IDrawProps) {
  const canva = ctx
  const { size, color } = settings
  
  const holding = holdClient as TPos

  canva.beginPath()
  canva.lineJoin = "miter"
  canva.lineCap = "butt"
  canva.moveTo(holding.x, holding.y)
  canva.lineTo(x + size, y + size/2)
  canva.strokeStyle = color
  canva.lineWidth = size
  canva.stroke()
}

function drawRect({ x, y, holding, settings }: IDrawProps) {
  const canva = ctx
  const { color } = settings

  canva.fillStyle = color

  const { width, heigth } = getRectSize(holding as TPos, { x, y })

  canva.fillRect(holding?.x as number, holding?.y as number, width, heigth)
}

function drawCircle({ x, y, holding, settings }: IDrawProps) {
  const canva = ctx
  const { color } = settings
  canva.fillStyle = color

  canva.beginPath()
    
  const radio = getCircleRadio(holding as TPos, { x, y })

  canva.arc(holding?.x as number, holding?.y as number, radio, 0, 2 * Math.PI)
  canva.fill()
}

export { drawPoint, drawLine, drawRect, drawCircle }
