import { MutableRefObject, RefObject } from "react"
import { Tool } from "./tool"
import { Socket } from "socket.io-client"

type TPos = {
  x: number
  y: number
}

type TCanvaContext = {
  canva: RefObject<HTMLCanvasElement | undefined> | null
  settings: TCanvaSettings
  updateSettings: (setting: keyof TCanvaSettings, value: any) => void
  pos: {
    canva: TPos,
    client: TPos,
    holding: TPos
  }
  updatePos: (pos: TPos, type: keyof TCanvaContext["pos"]) => void
  tool: Tool,
  selectTool: (tool: Tool) => void
}

type TSocketContext = {
  socket: Socket | null
  disconnect: () => void
  connect: () => void
  username: string
  setUsername: (username: string) => void
}