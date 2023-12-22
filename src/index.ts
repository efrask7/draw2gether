import { performance } from "perf_hooks"
const startedServer = performance.now()
import express from "express"
import { Server } from "socket.io"
import http from "http"
import cors from "cors"
import "./canvas/index"
import { canvasEvents, canvasEventsLabel } from "./canvas/events"
import { getCanvaImage, startCanva } from "./canvas/functions"

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
  socket.on("canvas:init", () => {
    socket.emit("canvas:init", getCanvaImage())
  })

  // socket.on("canvas:draw", (info: IDrawProps) => {
  //   io.emit("canvas:draw", { ...info, from: socket.id })
  // })

  // socket.on("canvas:draw_line", (info: IDrawProps) => {
  //   io.emit("canvas:draw_line", { ...info, from: socket.id })
  // })

  // socket.on("canvas:draw_rect", (info: IDrawProps) => {
  //   io.emit("canvas:draw_rect", { ...info, from: socket.id })
  // })

  // socket.on("canvas:draw_circle", (info: IDrawProps) => {
  //   io.emit("canvas:draw_circle", { ...info, from: socket.id })
  // })

  canvasEventsLabel.forEach(event => {
    socket.on(event, (data) => {
      canvasEvents[event]({
        event,
        io,
        socket,
        props: data
      })
    })
  })

  socket.on("disconnect", reason => console.log("Disconnection", socket.id, reason))
})

server.listen(4444, () => {
  startCanva()
  console.log(`Server started at PORT 4444 in ${performance.now() - startedServer}ms`)
})
