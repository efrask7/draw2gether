import { TMessage } from "@/components/ChatMessages"
import { useSocket } from "@/context/SocketContext"
import { useEffect, useState } from "react"

interface IMessage extends TMessage {
  from: string
}

function ChatEvents() {
  
  const { socket } = useSocket()
  const [messages, setMessages] = useState<IMessage[]>([])

  function handleNewMessage(data: IMessage) {
    setMessages(prev => ([
      ...prev,
      data
    ]))
  }

  useEffect(() => {
    if (socket) {
      socket.on("chat:message", handleNewMessage)
      socket.on("chat:join", handleNewMessage)
    }

    return () => {
      if (socket) {
        socket.off("chat:message")
        socket.off("chat:join")
      }
    }
  }, [socket])

  return {
    messages
  }
}

export default ChatEvents
