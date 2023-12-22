import { TPos } from "@/types/context";
import { RefObject } from "react";
import { getCircleRadio, getRectSize } from "./calc";

interface IDrawProps extends TPos {
  canvaRef: RefObject<HTMLCanvasElement>
  eraser: boolean,
  settings: TCanvaSettings
  holding?: {
    x: number,
    y: number
  }
}

function drawPoint({ canvaRef, x, y, eraser, settings }: IDrawProps) {
  if (canvaRef.current) {
    const canva = canvaRef.current.getContext("2d") as CanvasRenderingContext2D
    const { size, color } = settings

    // canva.beginPath()
    // canva.lineWidth = size
    // canva.lineJoin = canva.lineCap = "round"
    // canva.strokeStyle = eraser ? "#ffffff" : color
    // // canva.moveTo(x, y)
    // canva.lineTo(x, y)
    // canva.stroke()

    canva.fillStyle = eraser ? "#ffffff" : color
    canva.fillRect(x, y, size, size)
  }
}

function drawLine({ canvaRef, x, y, holding: holdClient, settings }: IDrawProps) {
  if (canvaRef.current) {
    const canva = canvaRef.current.getContext("2d") as CanvasRenderingContext2D
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
}

function drawRect({ canvaRef, x, y, holding, settings }: IDrawProps) {
  if (canvaRef.current) {
    const canva = canvaRef.current.getContext("2d") as CanvasRenderingContext2D
    const { color } = settings

    canva.fillStyle = color

    const { width, heigth } = getRectSize(holding as TPos, { x, y })
  
    canva.fillRect(holding?.x as number, holding?.y as number, width, heigth)
  }
}

function drawCircle({ canvaRef, x, y, holding, settings }: IDrawProps) {
  if (canvaRef.current) {
    const canva = canvaRef.current.getContext("2d") as CanvasRenderingContext2D
    const { color } = settings
    canva.fillStyle = color

    canva.beginPath()
    
    const radio = getCircleRadio(holding as TPos, { x, y })

    canva.arc(holding?.x as number, holding?.y as number, radio, 0, 2 * Math.PI)
    canva.fill()
  }
}

export { drawPoint, drawLine, drawRect, drawCircle }
export type { IDrawProps }
