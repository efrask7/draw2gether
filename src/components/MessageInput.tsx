"use client"
import { FormEvent, PropsWithChildren, useState } from "react"
import { IoSend } from "react-icons/io5"
import UseMessage from "./UseMessage"

function ButtonContainer({ children }: PropsWithChildren) {
  return (
    <div
      className="grid place-content-center w-1/5 p-1 relative"
    >
      {children}
    </div>
  )
}

const ringDiv = "ring-2 ring-white"

function MessageInput() {

  
  const [inputActive, setInputActive] = useState(false)
  const [messageData, setMessageData] = useState({
    message: "",
    color: "#eeeeee"
  })
  
  function updateMessageData(data: keyof typeof messageData, value: string) {
    setMessageData(prev => ({
      ...prev,
      [data]: value
    }))
  }
  
  const { sendMessage } = UseMessage({ messageData })


  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()

    if (!messageData.message) return

    sendMessage()
    updateMessageData("message", "")
  }

  return (
    <form
      className={`
        flex
        h-full
        p-1
        rounded
        ${inputActive ? "bg-indigo-900" : "bg-indigo-800"}
        divide-x divide-slate-900
        ${inputActive && ringDiv}
      `}
      onSubmit={handleSubmit}
    >
      <ButtonContainer>
        <input 
          type="color"
          className="
            invisible
            h-full w-full
            absolute
            translate-x-1/2 translate-y-1/2
            pointer-events-none
          "
          id="message_color"
          value={messageData.color}
          onChange={(ev) => updateMessageData("color", ev.target.value)}
        />
        <label 
          htmlFor="message_color"
          title="Color del mensaje"
          className="border border-slate-900 rounded-full size-full p-2.5 cursor-pointer"
          style={{
            background: messageData.color
          }}
        />
      </ButtonContainer>
      <input 
        type="text"
        className="
          bg-transparent 
          h-full w-full
          focus:outline-0
          px-1
        "
        onFocus={() => setInputActive(true)}
        onBlur={() => setInputActive(false)}
        value={messageData.message}
        onChange={(ev) => updateMessageData("message", ev.target.value)}
      />
      <ButtonContainer>
        <button 
          type="submit"
          className="w-full h-full"
        >
          <IoSend/>
        </button>
      </ButtonContainer>
    </form>
  )
}

export default MessageInput
