"use client"
import { useSocket } from "@/context/SocketContext"

type TUseMessageProps = {
  messageData: {
    message: string
    color: string
  }
}

function UseMessage({ messageData }: TUseMessageProps) {
  const { socket, username } = useSocket()

  function sendMessage() {
    if (socket) {
      socket.emit("chat:message", {
        ...messageData,
        from: username
      })
    }
  }

  return {
    sendMessage
  }
}

export default UseMessage
