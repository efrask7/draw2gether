"use client"

import { useSocket } from "@/context/SocketContext"

function SocketStatus() {
  
  const { socket } = useSocket()
  
  return (
    <div
      className="absolute inset-0 ml-2 mt-2 p-2 w-fit h-fit border rounded bg-indigo-800 flex gap-2 items-center text-gray-200"
    >
      <div 
        className={`rounded-full w-3 h-3 ${socket?.connected ? "bg-emerald-500" : "bg-red-500"}`}
      />

      {
        socket?.connected
          ? "Conectado"
          : "Desconectado"
      }
    </div>
  )
}

export default SocketStatus
