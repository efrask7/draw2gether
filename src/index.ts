import express from "express"
import { Server } from "socket.io"
import http from "http"
import cors from "cors"

const app = express()
const server = http.createServer(app)
app.use(cors())
const io = new Server(server, {
  cors: {
    origin: "*"
  }
})

io.on("connection", socket => {
  console.log("New connection", socket.id)

  socket.on("canvas:draw", (info: TDrawProps) => {
    io.emit("canvas:draw", { ...info, from: socket.id })
  })

  socket.on("canvas:draw_line", (info: TDrawProps) => {
    io.emit("canvas:draw_line", { ...info, from: socket.id })
  })

  socket.on("canvas:draw_rect", (info: TDrawProps) => {
    io.emit("canvas:draw_rect", { ...info, from: socket.id })
  })

  socket.on("canvas:draw_circle", (info: TDrawProps) => {
    io.emit("canvas:draw_circle", { ...info, from: socket.id })
  })

  socket.on("disconnct", () => console.log("Disconnection", socket.id))
})

server.listen(4444, () => console.log("Server started at PORT 4444"))
