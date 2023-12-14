import { TPos } from "@/types/context";

function getNegativeValue(value: number) {
  return value < -300
    ? -300
    : value
}

function getPositiveValue(value: number) {
  return value > 300
    ? 300
    : value
}

function getRectSize(holding: TPos, actual: TPos) {
  const previewWidth = actual.x - holding.x
  const previewHeigth = actual.y - holding.y

  let width = 0
  let heigth = 0

  // previewWidth < 0
  //   ? width = getNegativeValue(previewWidth)
  //   : width = getPositiveValue(previewWidth)

  // previewHeigth < 0
  //   ? heigth = getNegativeValue(previewHeigth)
  //   : heigth = getNegativeValue(previewHeigth)

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
