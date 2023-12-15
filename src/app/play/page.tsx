"use client"
import Canva from "@/components/Canva"
import ToolBar from "@/components/ToolBar"
import { useSocket } from "@/context/SocketContext"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

function Game() {

  const { username, socket } = useSocket()
  const router = useRouter()


  useEffect(() => {
    if (!username || !socket?.connected) router.push("/")
  }, [username, socket])

  return (
    <div
      className="h-full flex justify-around items-center"
    >

    <ToolBar/>
      
    <Canva/>

    </div>
  )
}

export default Game
