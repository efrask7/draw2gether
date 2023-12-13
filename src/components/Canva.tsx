"use client"

import { UseCanva } from "@/context/CanvaContext"
import { LegacyRef } from "react"

function Canva() {
  
  const { canva } = UseCanva()
  
  return (
    <div className="relative">
      <canvas
        width={800}
        height={600}
        className="border rounded bg-white"
        ref={canva as LegacyRef<HTMLCanvasElement>}
      />

      <canvas
        width={800}
        height={600}
        className="absolute z-10 inset-0 pointer-events-none opacity-50"
      />
    </div>
  )
}

export default Canva
