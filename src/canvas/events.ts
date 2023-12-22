import { Server, Socket } from "socket.io"
import { drawCircle, drawLine, drawPoint, drawRect } from "./draw"
import { IDrawProps, TCanvaEventProps } from "./types"

type TCanvaEvent =   
  "canvas:draw" |
  "canvas:draw_line" |
  "canvas:draw_rect" |
  "canvas:draw_circle" 

const canvasEventsLabel: TCanvaEvent[] = [
  "canvas:draw",
  "canvas:draw_line",
  "canvas:draw_rect",
  "canvas:draw_circle"
]

function drawCanvaPoint({ props, io, socket, event }: TCanvaEventProps) {
  drawPoint({ ...props })
  io.emit(event, { ...props, from: socket.id })
}

function drawCanvaLine({ props, io, socket, event }: TCanvaEventProps) {
  drawLine({ ...props })
  io.emit(event, { ...props, from: socket.id })
}

function drawCanvaRect({ props, io, socket, event }: TCanvaEventProps) {
  drawRect({ ...props })
  io.emit(event, { ...props, from: socket.id })
}

function drawCanvaCircle({ props, io, socket, event }: TCanvaEventProps) {
  drawCircle({ ...props })
  io.emit(event, { ...props, from: socket.id })
}

const canvasEvents: { [key in TCanvaEvent]: (info: TCanvaEventProps) => void  } = {
  "canvas:draw": (info) => drawCanvaPoint({...info}),
  "canvas:draw_line": (info) => drawCanvaLine({...info}),
  "canvas:draw_rect": (info) => drawCanvaRect({...info}),
  "canvas:draw_circle": (info) => drawCanvaCircle({...info})
}

export type { TCanvaEvent }
export { canvasEvents, canvasEventsLabel }
