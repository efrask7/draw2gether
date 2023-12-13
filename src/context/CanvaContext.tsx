import { TCanvaContext } from "@/types/context";
import { PropsWithChildren, createContext, createRef, useContext, useEffect, useRef, useState } from "react";

const CanvaContext = createContext<TCanvaContext>({
  canva: null,
  settings: {
    size: 5,
    color: "#000000",
    hover: false
  },
  updateSettings: () => {}
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
    hover: false
  })

  function updateSettings (setting: keyof TCanvaSettings, value: any) {
    setCanvaSettings(prev => ({
      ...prev,
      [setting]: value
    }))
  }
  
  return (
    <CanvaContext.Provider
      value={{
        canva: canvaRef,
        settings: canvaSettings,
        updateSettings
      }}
    >
      {children}
    </CanvaContext.Provider>
  )
}

export { UseCanva, CanvaProvider }