import ChatEvents from "@/events/ChatEvents"

type TMessage = {
  message: string
  author: string
  color?: string
}


function Message({ message, author, color = "#eee" }: TMessage) {
  return (
    <div
      className="flex gap-1 break-all size-full flex-wrap"
      style={{
        color
      }}
    >
      <p className="font-bold break-none">{author}:</p>
      <span>{message}</span>
    </div>
  )
}

function ChatMessages() {

  const { messages } = ChatEvents()

  return (
    <div
      className="
        size-full rounded p-1.5
        flex flex-col gap-1 justify-end 
        divide-y divide-gray-900
        overflow-y-auto
      "
    >
      {/* <Message
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
      /> */}

      {
        messages.map((message, i) => (
          <Message
            message={message.message}
            author={message.from}
            color={message.color}
            key={i}
          />
        ))
      }
    </div>
  )
}

export type { TMessage }
export default ChatMessages
