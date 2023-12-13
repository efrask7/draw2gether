"use client"
import { Tool } from "@/types/tool"
import UseButton from "./UseButton"
import UseOptions from "./UseOptions"
import { UseCanva } from "@/context/CanvaContext"

function ToolBar() {

  const { selectTool } = UseCanva()

  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col divide-y-2 border-2 border-slate-100/80 rounded">
        <UseButton
          action={() => selectTool(Tool.mouse)}
          tool={Tool.mouse}
        />

        <UseButton
          action={() => selectTool(Tool.pencil)}
          tool={Tool.pencil}
        />

        <UseButton
          action={() => selectTool(Tool.eraser)}
          tool={Tool.eraser}
        />

        <UseButton
          action={() => selectTool(Tool.line)}
          tool={Tool.line}
        />

        <UseButton
          action={() => selectTool(Tool.rect)}
          tool={Tool.rect}
        />

        <UseButton
          action={() => selectTool(Tool.circle)}
          tool={Tool.circle}
        />
      </div>

      <div>
        <UseOptions/>
      </div>
    </div>
  )
}

export default ToolBar
