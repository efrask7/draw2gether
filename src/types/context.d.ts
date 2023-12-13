import { MutableRefObject, RefObject } from "react"

type TCanvaContext = {
  canva: RefObject<HTMLCanvasElement | undefined> | null
  settings: TCanvaSettings
  updateSettings: (setting: keyof TCanvaSettings, value: any) => void
}