import { createCanvas } from "canvas"

const canvas = createCanvas(800, 600)
const ctx = canvas.getContext("2d")

console.log("created canvas")

export { canvas, ctx }
