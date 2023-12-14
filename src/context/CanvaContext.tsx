import { TCanvaContext, TPos } from "@/types/context";
import { Tool } from "@/types/tool";
import { PropsWithChildren, createContext, createRef, useContext, useEffect, useRef, useState } from "react";

const CanvaContext = createContext<TCanvaContext>({
  canva: null,
  settings: {
    size: 5,
    color: "#000000",
    hover: false,
    pointerDown: false
  },
  updateSettings: () => {},
  pos: {
    canva: {x: 0, y:0},
    client: {x: 0, y:0},
    holding: {x: 0, y:0}
  },
  updatePos: () => {},
  tool: Tool.mouse,
  selectTool: () => {}
})

function UseCanva() {
  const context = useContext(CanvaContext)
  if (!context) throw "Canva context is being used outside a provider"
  return context
}

function CanvaProvider({ children }: PropsWithChildren) {
  const canvaRef = createRef<HTMLCanvasElement>()
  
  const [canvaSettings, setCanvaSettings] = useState<TCanvaSettings>({
    size: 5,
    color: "#000000",
    hover: false,
    pointerDown: false
  })

  const [pos, setPos] = useState({
    canva: { x: 0, y: 0 },
    client: { x: 0, y: 0 },
    holding: { x: 0, y: 0}
  })

  const [toolSelected, setToolSelected] = useState<Tool>(Tool.mouse)

  function updateSettings(setting: keyof TCanvaSettings, value: any) {
    setCanvaSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }

  function updatePos(pos: TPos, type: keyof TCanvaContext["pos"]) {
    setPos(prev => ({
      ...prev,
      [type]: pos
    }))
  }

  function selectTool(tool: Tool) {
    setToolSelected(tool)
  }

  return (
    <CanvaContext.Provider
      value={{
        canva: canvaRef,
        settings: canvaSettings,
        updateSettings,
        pos: {
          canva: pos.canva,
          client: pos.client,
          holding: pos.holding
        },
        updatePos,
        tool: toolSelected,
        selectTool
      }}
    >
      {children}
    </CanvaContext.Provider>
  )
}

export { UseCanva, CanvaProvider }