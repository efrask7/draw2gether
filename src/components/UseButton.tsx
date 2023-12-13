"use client"
import { Tool } from "@/types/tool"
import { IconType } from "react-icons"
import { TbPointerFilled } from "react-icons/tb"
import { FaPencil, FaEraser, FaCircle } from "react-icons/fa6"
import { PiLineSegmentBold, PiRectangleFill } from "react-icons/pi"

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

function UseButton({ action, tool }: TButton) { 
  return (
    <button
      onClick={() => action()}
      className="
        text-gray-200 
        p-3 
        text-xl 
        bg-indigo-700 
        hover:bg-indigo-800 
        hover:text-gray-400
        active:bg-indigo-900
      "
      title={tool}
    >
      {
        toolIcon[tool]
      }
    </button>
  )
}

export default UseButton
