"use client"
import { UseCanva } from "@/context/CanvaContext"
import { useSocket } from "@/context/SocketContext"
import { IDrawProps, drawCircle, drawLine, drawPoint, drawRect } from "@/tools/draw"
import { RefObject, useEffect } from "react"

type TSocketEvent = {
  [event: string]: () => void
}

type TSocketCanvaEvent = {
  [event: string]: (props: Omit<IDrawProps, "canvaRef">) => void
}

interface IEventProps extends Omit<IDrawProps, "canvaRef"> {
  from: string
}

function UseEvents() {
 
  const { canva } = UseCanva()
  const { socket } = useSocket()

  useEffect(() => {
    if (socket && canva) {

      const fromMyself = (id: string) => id === socket.id

      const canvaRef = canva as RefObject<HTMLCanvasElement>
      socket.on("canvas:draw", (props: IEventProps) => {
        if (fromMyself(props.from)) return
        drawPoint({ ...props, canvaRef })
      })

      socket.on("canvas:draw_line", (props: IEventProps) => {
        if (fromMyself(props.from)) return
        drawLine({ ...props, canvaRef })
      })

      socket.on("canvas:draw_rect", (props: IEventProps) => {
        if (fromMyself(props.from)) return
        drawRect({ ...props, canvaRef })
      })

      socket.on("canvas:draw_circle", (props: IEventProps) => {
        if (fromMyself(props.from)) return
        drawCircle({ ...props, canvaRef })
      })
    }

    return () => {
      if (socket && canva) {
        socket.off("canvas:draw")
        socket.off("canvas:draw_line")
        socket.off("canvas:draw_rect")
        socket.off("canvas:draw_circle")
      }
    }
  }, [socket, canva])
  
  return <></>
}

export default UseEvents
