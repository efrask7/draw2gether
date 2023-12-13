"use client"
import { Tool } from "@/types/tool"
import { TbPointerFilled } from "react-icons/tb"
import { FaPencil, FaEraser, FaCircle } from "react-icons/fa6"
import { PiLineSegmentBold, PiRectangleFill } from "react-icons/pi"
import { UseCanva } from "@/context/CanvaContext"

type TButton = {
  action: () => void
  tool: Tool
}

const toolIcon: Readonly<{ [key in Tool]: JSX.Element }> = {
  [Tool.mouse]: <TbPointerFilled/>,
  [Tool.pencil]: <FaPencil />,
  [Tool.eraser]: <FaEraser/>,
  [Tool.line]: <PiLineSegmentBold/>,
  [Tool.rect]: <PiRectangleFill/>,
  [Tool.circle]: <FaCircle/>
}

const useRing = "ring-2 ring-inset ring-emerald-500 text-emerald-400"

function UseButton({ action, tool: btnTool }: TButton) { 

  const { tool } = UseCanva()

  return (
    <button
      onClick={() => action()}
      className={`
        text-gray-200 
        p-3 
        text-xl 
        bg-indigo-700 
        hover:bg-indigo-800 
        hover:text-gray-400
        active:bg-indigo-900
        ${tool === btnTool && useRing}
      `}
      title={btnTool}
    >
      {
        toolIcon[btnTool]
      }
    </button>
  )
}

export default UseButton
