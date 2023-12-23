"use client"

import { UseCanva } from "@/context/CanvaContext"
import { useSocket } from "@/context/SocketContext"
import UseEvents from "@/events/SocketEvents"
import { resetGhostCanva } from "@/tools/drawGhost"
import { toolFunctions, toolGhostFunctions, toolWithoutGhost } from "@/tools/functions"
import { Tool, toolCursorShow } from "@/types/tool"
import { LegacyRef, MouseEvent, RefObject, useEffect, useRef } from "react"

function Canva() {
  
  const { canva, settings, updatePos, updateSettings, pos, tool } = UseCanva()
  const { socket } = useSocket()

  const ghostCanva = useRef<HTMLCanvasElement>(null)

  function getPosInCanva(x: number, y: number) {
    let leftCanva = 0
    let topCanva = 0

    const canvaSize = canva?.current?.getBoundingClientRect()
    leftCanva = canvaSize?.left as number
    topCanva = canvaSize?.top as number

    const offsetSize = settings.size / 2

    return {
      x: (x - leftCanva) - offsetSize,
      y: (y - topCanva) - offsetSize,
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

  function handlePointerDown(ev: MouseEvent) {
    updateSettings("pointerDown", true)
    
    const { x, y } = getPosInCanva(ev.clientX, ev.clientY)
  
    const canvaPos = {
      x,
      y
    }

    if (!toolWithoutGhost.includes(tool)) {
      updatePos(canvaPos, "holding")
    }
  }

  function handlePointerUp() {
    updateSettings("pointerDown", false)
    resetGhostCanva(ghostCanva)
  }

  function handlePointerEnter() {
    updateSettings("hover", true)
  }

  function handlePointerLeave() {
    updateSettings("hover", false)
    updateSettings("pointerDown", false)
    updatePos({ x: 0, y: 0 }, "holding")
    resetGhostCanva(ghostCanva)
  }

  function getMouseToolDisplay() {
    if (!toolCursorShow.includes(tool)) return false

    return settings.hover
  }

  function getCursor() {
    if (!toolCursorShow.includes(tool) && tool !== Tool.mouse) return "crosshair"
    if (toolCursorShow.includes(tool)) return "none"
    return "default"
  }

  useEffect(() => {

    if (tool === Tool.mouse) return

    const canvaRef = canva as RefObject<HTMLCanvasElement>
    const ghostRef = ghostCanva as RefObject<HTMLCanvasElement>
    const eraser = tool === Tool.eraser
    const { canva: canvaPos, holding } = pos
    const { x, y } = canvaPos
    
    if (settings.pointerDown) {
      if (toolWithoutGhost.includes(tool)) {
        const event = toolFunctions[tool as keyof typeof toolFunctions]({ canvaRef, eraser, settings, x, y })
        socket?.emit(event, { eraser, settings, x, y })
      } else {
        toolGhostFunctions[tool as keyof typeof toolGhostFunctions]({ canvaRef: ghostRef, eraser, settings, x, y, holding })
      }
    } else {
      if (pos.holding.x !== 0 && !toolWithoutGhost.includes(tool)) {
        const event = toolFunctions[tool as keyof typeof toolFunctions]({ canvaRef, settings, x, y, holding, eraser })
        socket?.emit(event, { eraser, settings, x, y, holding })
        updatePos({x:0, y: 0}, "holding")
      }
    }
  }, [settings, tool, pos, canva, socket, updatePos])
  
  return (
    <>
    <div className="relative">
      <canvas
        width={800}
        height={600}
        className={`border rounded bg-white`}
        style={{
          cursor: getCursor()
        }}
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
        ref={ghostCanva}
      />
    </div>
    
    <div
      className="absolute opacity-80 bg-transparent pointer-events-none z-10"
      style={{
        left: pos.client.x,
        top: pos.client.y,
        width: settings.size + "px",
        height: settings.size + "px",
        display: getMouseToolDisplay() ? "inline" : "none",
        border: `1px solid ${tool === Tool.eraser ? "#000000" : settings.color}`,
        // borderRadius: (tool === Tool.pencil || tool === Tool.eraser) ? "100%" : "0"
      }}
    />

    <UseEvents/>

    {/* <div className="absolute border rounded p-2 flex gap-2 bg-cyan-950 text-white flex-col bottom-0 mb-5">

      <div className="flex gap-2">
        <p>Canva:</p>
        <span>X {pos.canva.x}</span>
        <span>Y {pos.canva.y}</span>
      </div>

      <div className="flex gap-2">
        <p>Client:</p>
        <span>X {pos.client.x}</span>
        <span>Y {pos.client.y}</span>
      </div>

      <div className="flex gap-2">
        <p>Hold:</p>
        <span>X: {pos.holding.x}</span>
        <span>Y: {pos.holding.y}</span>
      </div>
    </div> */}
    </>
  )
}

export default Canva
