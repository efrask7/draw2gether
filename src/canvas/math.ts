import { TPos } from "./types"

function getRectSize(holding: TPos, actual: TPos) {
  const previewWidth = actual.x - holding.x
  const previewHeigth = actual.y - holding.y

  return {
    width: previewWidth,
    heigth: previewHeigth
  }
}

function getCircleRadio(holding: TPos, actual: TPos) {
  const calcX = Math.abs(actual.x - holding.x) * Math.abs(actual.x - holding.x)
  const calcY = Math.abs(actual.y - holding.y) * Math.abs(actual.y - holding.y)
  const sumCalcXY = calcX + calcY
  const res = Math.sqrt(sumCalcXY)
  return res > 150
          ? 150
          : res
}

export { getRectSize, getCircleRadio }
