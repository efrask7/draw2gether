"use client"

import { UseCanva } from "@/context/CanvaContext"
import { Tool } from "@/types/tool"
import { LegacyRef, MouseEvent } from "react"

function Canva() {
  
  const { canva, settings, updatePos, updateSettings, pos, tool } = UseCanva()

  function getPosInCanva(x: number, y: number) {
    let leftCanva = 0
    let topCanva = 0

    const canvaSize = canva?.current?.getBoundingClientRect()
    leftCanva = canvaSize?.left as number
    topCanva = canvaSize?.top as number

    const offsetSize = settings.size / 2

    return {
      x: (x - leftCanva) / offsetSize,
      y: (y- topCanva) / offsetSize,
      offset: offsetSize
    }
  }

  function handleMouseMove(ev: MouseEvent) {
    const { clientX, clientY } = ev
    const { x, y, offset } = getPosInCanva(clientX, clientY)
  
    const canvaPos = {
      x,
      y
    }

    const clientPos = {
      x: clientX - offset,
      y: clientY - offset
    }

    updatePos(canvaPos, "canva")
    updatePos(clientPos, "client")
  }

  function handlePointerDown() {

  }

  function handlePointerUp() {

  }

  function handlePointerEnter() {
    updateSettings("hover", true)
  }

  function handlePointerLeave() {
    updateSettings("hover", false)
  }

  function getMouseToolDisplay() {
    if (tool === Tool.mouse) return false

    return settings.hover
  }
  
  return (
    <>
    <div className="relative">
      <canvas
        width={800}
        height={600}
        className="border rounded bg-white"
        ref={canva as LegacyRef<HTMLCanvasElement>}
        onMouseMove={handleMouseMove}
        onPointerUp={handlePointerUp}
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      />

      <canvas
        width={800}
        height={600}
        className="absolute z-10 inset-0 pointer-events-none opacity-50"
      />
    </div>
    
    <div
      className="absolute border border-slate-950 opacity-80 bg-transparent pointer-events-none"
      style={{
        left: pos.client.x,
        top: pos.client.y,
        width: settings.size + "px",
        height: settings.size + "px",
        display: getMouseToolDisplay() ? "inline" : "none"
      }}
    />
    </>
  )
}

export default Canva
