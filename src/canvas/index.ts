import { createCanvas } from "canvas"

const canvas = createCanvas(800, 600)
const ctx = canvas.getContext("2d")

console.log("Canvas created")

export { canvas, ctx }
