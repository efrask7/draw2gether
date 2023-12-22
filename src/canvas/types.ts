import { Server, Socket } from "socket.io"
import { TCanvaEvent } from "./events"

type TCanvaSettings = {
  size: number
  color: string
}

type TPos = {
  x: number
  y: number
}

interface IDrawProps extends TPos {
  eraser: boolean,
  settings: TCanvaSettings
  holding?: {
    x: number,
    y: number
  }
}

type TCanvaEventProps = {
  props: IDrawProps
  io: Server
  socket: Socket
  event: TCanvaEvent
}

export type { TCanvaEventProps, TPos, IDrawProps }
