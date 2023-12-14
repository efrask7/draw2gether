import { Tool } from "@/types/tool";
import { IDrawProps, drawCircle, drawLine, drawPoint, drawRect } from "./draw";
import { drawGhostCircle, drawGhostLine, drawGhostRect } from "./drawGhost";

const toolWithoutGhost: Tool[] = [
  Tool.pencil,
  Tool.eraser
]

const toolFunctions: { [key in Tool]: (props: IDrawProps) => string } = {
  [Tool.mouse]: () => "",
  [Tool.pencil]: (props) => { drawPoint(props); return "canvas:draw"},
  [Tool.eraser]: (props) => { drawPoint(props); return "canvas:draw"},
  [Tool.line]: (props) => { drawLine(props); return "canvas:draw_line"},
  [Tool.rect]: (props) => { drawRect(props); return "canvas:draw_rect"},
  [Tool.circle]: (props) => { drawCircle(props); return "canvas:draw_circle"}
}

const toolGhostFunctions: { [key in Tool]: (props: IDrawProps) => void } = {
  [Tool.mouse]: () => {},
  [Tool.pencil]: () => {},
  [Tool.eraser]: () => {},
  [Tool.line]: drawGhostLine,
  [Tool.rect]: drawGhostRect,
  [Tool.circle]: drawGhostCircle
}

export { toolWithoutGhost, toolFunctions, toolGhostFunctions }
