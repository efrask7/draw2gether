"use client"
import { TSocketContext } from "@/types/context"
import { PropsWithChildren, createContext, useContext, useState } from "react"
import { io } from "socket.io-client"

const SocketContext = createContext<TSocketContext>({
  socket: null,
  connect: () => {},
  disconnect: () => {}
})

function useSocket() {
  const context = useContext(SocketContext)
  if (!context) throw "Socket context is used outside a provider"
  return context
}

function SocketProvider({ children }: PropsWithChildren) {
  
  const [socket, setSocket] = useState<TSocketContext["socket"]>(null)

  function connect() {
    const socketConn = io(`${window.location.protocol}//${window.location.hostname}:4444`)

    socketConn.on("connect", () => {
      setSocket(socketConn)
    })

    socketConn.on("disconnect", () => {
      setSocket(null)

      socketConn.off("connect")
      socketConn.off("disconnect")
    })
  }

  function disconnect() {
    if (socket?.connected) {
      socket.disconnect()
    }
  }
  
  return (
    <SocketContext.Provider
      value={{
        socket,
        connect,
        disconnect
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { SocketProvider, useSocket }
