"use client"
import { Tool } from "@/types/tool"
import UseButton from "./UseButton"
import UseOptions from "./UseOptions"

function ToolBar() {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col divide-y-2 border-2 border-slate-100/80 rounded">
        <UseButton
          action={() => {}}
          tool={Tool.mouse}
        />

        <UseButton
          action={() => {}}
          tool={Tool.pencil}
        />

        <UseButton
          action={() => {}}
          tool={Tool.eraser}
        />

        <UseButton
          action={() => {}}
          tool={Tool.line}
        />

        <UseButton
          action={() => {}}
          tool={Tool.rect}
        />

        <UseButton
          action={() => {}}
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
