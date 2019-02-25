export const solveSimultaneousEquations = (a, b, c, d, e, f) => {
  // Solve system of equations ax + by = e and cx + dy = f
  const det = ((a) * (d) - (b) * (c))
  const x = ((d) * (e) - (b) * (f)) / det
  const y = ((a) * (f) - (c) * (e)) / det
  return { x, y }
}

export const getProjectionFromPointToLine = (point, line) => {
  // Get projection from point (x, y) to a line ax + by + c = 0
  const projection = solveSimultaneousEquations(line[0], line[1], -line[1], line[0], -line[2], line[0] * point.y - line[1] * point.x)
  return projection
}

export const getDistanceFromPointToLine = (point, line) => {
  return Math.abs(line[0] * point.x + line[1] * point.y + line[2]) / Math.sqrt(line[0] * line[0] + line[1] * line[1])
}

export const getClosestLine = (currentPoint, lastPoint) => {
  // 4 base line in plane, horizontal, vertical, 45 degree, 135 degree
  // each line formulation ax + by + c = 0 -> [a, b, c]
  const lineList = [
    [1, 1, -1 * (lastPoint.x + lastPoint.y)],
    [1, -1, -1 * (lastPoint.x - lastPoint.y)],
    [1, 0, -lastPoint.x],
    [0, 1, -lastPoint.y],
  ]

  const distance = lineList.map(line => getDistanceFromPointToLine(currentPoint, line))
  const maxDistance = Math.min(...distance)
  const maxIndex = distance.indexOf(maxDistance)
  return lineList[maxIndex]
}

export const calculateVerticalAndHorizontalLine = (currentPoint, lastPoint) => {
  // simple calculation when we only want to lock 0, 90, 180, 270, 360 degree
  const xDistance = Math.abs(currentPoint.x - lastPoint.x)
  const yDistance = Math.abs(currentPoint.y - lastPoint.y)
  if (xDistance > yDistance) {
    return {
      x: currentPoint.x,
      y: lastPoint.y
    }
  } else {
    return {
      x: lastPoint.x,
      y: currentPoint.y
    }
  }
}

const solveEquationX = (line, yValue) => {
  // Find x when know y, equation line[0]x + line[1]y + line[2] = 0
  if (line[0] === 0) {
    throw new Error('There are infinite number of solutions')
  }
  return (-1) * (line[1] * yValue + line[2]) / line[0]
}

const solveEquationY = (line, xValue) => {
  // Find y when know x, equation line[0]x + line[1]y + line[2] = 0
  if (line[1] === 0) {
    throw new Error('There are infinite number of solutions')
  }
  return (-1) * (line[0] * xValue + line[2]) / line[1]
}

export const checkBoundary = (point, boundary, line) => {
  /**
   * If point is outside of boundary, return intersection between line and boundary
   */
  if (point.x < boundary.minX) {
    point.x = boundary.minX
    point.y = solveEquationY(line, boundary.minX)
  } else if (point.x > boundary.maxX) {
    point.x = boundary.maxX
    point.y = solveEquationY(line, boundary.maxX)
  }

  if (point.y < boundary.minY) {
    point.y = boundary.minY
    point.x = solveEquationX(line, boundary.minY)
  } else if (point.y > boundary.maxY) {
    point.y = boundary.maxY
    point.x = solveEquationX(line, boundary.maxY)
  }
  return point
}

export const calculateNearestPoint = (currentPoint, lastPoint, config = {}) => {
  const nearestLine = getClosestLine(currentPoint, lastPoint)
  let result = getProjectionFromPointToLine(currentPoint, nearestLine)
  const boundary = config.boundary
  if (boundary) {
    result = checkBoundary(result, boundary, nearestLine)
  }
  return result
}

export const calculatePosition = (currentPoint, lastPoint, config = {}) => {
  if (!lastPoint || !currentPoint) { return null }
  if (config.isSimple) {
    // only lock 0, 90, 180, 270, 360 degree
    return calculateVerticalAndHorizontalLine(currentPoint, lastPoint)
  } else {
    // lock 0, 45, 90, 135... degree
    return calculateNearestPoint(currentPoint, lastPoint, config)
  }
}
