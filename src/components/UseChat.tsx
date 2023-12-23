import { useSocket } from "@/context/SocketContext"
import ChatMessages from "./ChatMessages"
import MessageInput from "./MessageInput"

function UseChat() {
  
  const { username } = useSocket()
  
  return (
    <div
      className="
        border border-slate-100/80 rounded
        p-2
        flex flex-col gap-2
        h-96 w-64
        bg-indigo-600 text-white
        select-text
      "
    >
      <div
        className="
          px-2
          flex
          items-center flex-col gap-1
        "
      >
        <h2 className="font-bold text-gray-100 tracking-wider text-lg">
          Chat
        </h2>
        <div
          className="
            h-px w-full
            bg-slate-900
          "
        />
        <p className="
          bg-indigo-800
          py-0.5 px-6
          rounded-full
          w-100
        ">
          {username}
        </p>
      </div>

      <div className="flex-1">
        <ChatMessages/>
      </div>

      <div className="">
        <MessageInput/>
      </div>
    </div>
  )
}

export default UseChat
