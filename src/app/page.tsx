"use client"
import { useSocket } from "@/context/SocketContext"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"
import { BsBrushFill, BsCheckLg, BsPersonFill } from "react-icons/bs"

const blockedUsername = [
  "server"
]

export default function Home() {

  const router = useRouter()

  const { setUsername, socket, connect } = useSocket()

  const [inputFocus, setInputFocus] = useState(false)
  const [inputUser, setInputUser] = useState("")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [errorInput, setErrorInput] = useState("")

  function handleSubmit(ev: FormEvent) {
    ev.preventDefault()

    if (!inputUser) return
    if (blockedUsername.includes(inputUser.toLowerCase())) {
      setErrorInput("Usuario no permitido")
      return
    }
    
    setUsername(inputUser)
    setFormSubmitted(true)

    connect()
  }

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    if (formSubmitted && socket) {
      timeout = setTimeout(() => {
        router.push("/play")
      }, 2000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [socket, formSubmitted, router])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <form 
        className="bg-gray-800 text-white border rounded px-2 py-4 flex flex-col gap-3 w-96"
        onSubmit={handleSubmit}
      >
        <div>
          <h2 className="text-xl tracking-wider">Ingresa tu nombre</h2>
        </div>
        <div 
          className={`
            flex items-center
            bg-gray-100
            text-black
            p-1
            rounded-lg
            divide-x
            divide-black
            ${
              inputFocus
                && "ring-2 ring-inset ring-green-500"
            }
          `}
        >
          <div className="px-2">
            <BsPersonFill/>
          </div>
          <input 
            type="text"
            className="
              bg-transparent 
              appearance-none
              w-full
              focus:border-0
              focus:outline-0
              active:border-0
              active:outline-0
              px-2
            "
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            value={inputUser}
            onChange={(ev) => {
              setInputUser(ev.target.value)
              setErrorInput("")
            }}
          />
          <div
            className={`px-2 text-green-700 ${!formSubmitted && "hidden"}`}
          >
            <BsCheckLg/>
          </div>
        </div>

        <div>
          <p
            className="text-red-600 text-sm font-sans"
          >
            {errorInput}
          </p>
        </div>

        <div>
          <button 
            type="submit"
            className="
              flex items-center gap-1 
              bg-green-600
              px-2 py-1 
              font-bold ls-1 tracking-wider 
              rounded-full
              hover:bg-green-700
              active:ring-2
            "
            disabled={formSubmitted}
          >
            {
              formSubmitted
              ? <>{socket?.connected ? "Redirigiendo" : "Conectando..."}</>
              : <>Pintar <BsBrushFill/></>
            }
          </button>
        </div>
      </form>
    </div>
  )
}
