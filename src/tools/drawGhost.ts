import { TPos } from "@/types/context"
import { IDrawProps } from "./draw"
import { getCircleRadio, getRectSize } from "./calc"

function resetGhostCanva(canvaRef: IDrawProps["canvaRef"]) {
  if (canvaRef.current) {
    const canva = canvaRef.current?.getContext("2d") as CanvasRenderingContext2D | any
    canva.reset()
  }
}

function drawGhostLine({ canvaRef, x, y, holding: holdClient, settings }: IDrawProps) {
  if (canvaRef.current) {
    const canva = canvaRef.current?.getContext("2d") as CanvasRenderingContext2D | any
    const { size, color } = settings
    canva.reset()

    const holding = holdClient as TPos

    canva.beginPath()
    canva.moveTo(holding.x, holding.y)
    canva.lineTo(x + size, y + size/2)
    canva.strokeStyle = color
    canva.lineWidth = size
    canva.stroke()
  }
}

function drawGhostRect({ canvaRef, x, y, holding, settings }: IDrawProps) {
  if (canvaRef.current) {
    const canva = canvaRef.current.getContext("2d") as CanvasRenderingContext2D | any
    const { color } = settings
    canva.reset()

    canva.fillStyle = color

    const { width, heigth } = getRectSize(holding as TPos, { x, y })
  
    canva.fillRect(holding?.x, holding?.y, width, heigth)
  }
}

function drawGhostCircle({ canvaRef, x, y, holding, settings }: IDrawProps) {
  if (canvaRef.current) {
    const canva = canvaRef.current.getContext("2d") as CanvasRenderingContext2D | any
    const { color } = settings
    canva.reset()
    canva.fillStyle = color

    canva.beginPath()
    
    const radio = getCircleRadio(holding as TPos, { x, y })

    canva.arc(holding?.x, holding?.y, radio, 0, 2 * Math.PI)
    canva.fill()
  }
}

export { resetGhostCanva, drawGhostLine, drawGhostRect, drawGhostCircle }
