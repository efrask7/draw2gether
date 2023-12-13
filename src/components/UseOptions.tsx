"use client"

import { UseCanva } from "@/context/CanvaContext"

const formStyle = "flex flex-col gap-1"

function UseOptions() {

  const { settings, updateSettings } = UseCanva()

  return (
    <div className="bg-indigo-600 p-2 rounded border-2 flex flex-col gap-2">
      <div className="flex flex-col gap-1 bg-indigo-800 p-2 rounded text-gray-200 ring-2 ring-offset-1">
        <h2 className="text-xl italic">Pincel:</h2>
        <div className={formStyle}>
          <label htmlFor="size">Tamaño: {settings.size}</label>
          <input 
            type="range" 
            id="size" 
            min={1}
            max={50}
            value={settings.size}
            onChange={(ev) => updateSettings("size", ev.target.valueAsNumber)}
            className="appearance-none h-1 w-full cursor-pointer my-2 rounded-xl bg-indigo-200"
          />
        </div>
        <div className={formStyle}>
          <label htmlFor="color">Color:</label>
          <input 
            type="color" 
            id="color"
            value={settings.color}
            onChange={(ev) => updateSettings("color", ev.target.value)}
            className="h-6 w-full rounded-md cursor-pointer"
          />
        </div>
      </div>
    </div>
  )
}

export default UseOptions
