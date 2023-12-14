"use client"
import Canva from "@/components/Canva"
import ToolBar from "@/components/ToolBar"
import { useSocket } from "@/context/SocketContext"
import { useEffect } from "react"

function Game() {

  const { connect } = useSocket()

  useEffect(() => {
    connect()
  }, [])

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
