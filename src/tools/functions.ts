"use client"
import { Tool } from "@/types/tool";
import { IDrawProps, drawCircle, drawLine, drawPoint, drawRect } from "./draw";
import { drawGhostCircle, drawGhostLine, drawGhostRect } from "./drawGhost";
import { RefObject } from "react"

type TToolWithGhost = Tool.line | Tool.rect | Tool.circle

const toolWithoutGhost: Tool[] = [
  Tool.pencil,
  Tool.eraser
]

const toolFunctions: { [key in Exclude<Tool, Tool.mouse>]: (props: IDrawProps) => string } = {
  [Tool.pencil]: (props) => { drawPoint(props); return "canvas:draw"},
  [Tool.eraser]: (props) => { drawPoint(props); return "canvas:draw"},
  [Tool.line]: (props) => { drawLine(props); return "canvas:draw_line"},
  [Tool.rect]: (props) => { drawRect(props); return "canvas:draw_rect"},
  [Tool.circle]: (props) => { drawCircle(props); return "canvas:draw_circle"}
}

const toolGhostFunctions: { [key in TToolWithGhost]: (props: IDrawProps) => void } = {
  [Tool.line]: drawGhostLine,
  [Tool.rect]: drawGhostRect,
  [Tool.circle]: drawGhostCircle
}

function setImageToCanva(canva: RefObject<HTMLCanvasElement>, data: string) {
  if (canva.current) {
    const ctx = canva.current.getContext("2d") as CanvasRenderingContext2D
    const image = new Image(800, 600)
    image.src = data
    image.onload = () => {
      ctx.drawImage(image, 0, 0)
    }
  }
}

export { toolWithoutGhost, toolFunctions, toolGhostFunctions, setImageToCanva }
