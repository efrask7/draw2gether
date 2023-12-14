import { Tool } from "@/types/tool";
import { IDrawProps, drawCircle, drawLine, drawPoint, drawRect } from "./draw";
import { drawGhostCircle, drawGhostLine, drawGhostRect } from "./drawGhost";

const toolWithoutGhost: Readonly<Tool[]> = [
  Tool.pencil,
  Tool.eraser
]

const toolFunctions: Readonly<{ [key in Tool]: (props: IDrawProps) => void }> = {
  [Tool.mouse]: () => {},
  [Tool.pencil]: drawPoint,
  [Tool.eraser]: drawPoint,
  [Tool.line]: drawLine,
  [Tool.rect]: drawRect,
  [Tool.circle]: drawCircle
}

const toolGhostFunctions: Readonly<{ [key in Tool]: (props: IDrawProps) => void }> = {
  [Tool.mouse]: () => {},
  [Tool.pencil]: () => {},
  [Tool.eraser]: () => {},
  [Tool.line]: drawGhostLine,
  [Tool.rect]: drawGhostRect,
  [Tool.circle]: drawGhostCircle
}

export { toolWithoutGhost, toolFunctions, toolGhostFunctions }
