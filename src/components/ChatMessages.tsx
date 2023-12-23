type TMessage = {
  message: string
  author: string
  color?: string
}


function Message({ message, author, color = "#eee" }: TMessage) {
  return (
    <div
      className="flex gap-1"
      style={{
        color
      }}
    >
      <p className="font-bold">{author}:</p>
      <span>{message}</span>
    </div>
  )
}

function ChatMessages() {
  return (
    <div
      className="
        bg-indigo-800 h-full rounded p-1.5
        flex flex-col gap-1 justify-end 
        divide-y divide-gray-900
      "
    >
      <Message
        message="Hola"
        author="Juan"
      />

      <Message
        message="Hol"
        author="Pedro"
        color="#e00"
      />

      <Message
        message="Ho"
        author="XD"
      />
    </div>
  )
}

export default ChatMessages
