const { describe, beforeEach, it, expect } = global
import {
  solveSimultaneousEquations,
  getClosestLine,
  getDistanceFromPointToLine,
  getProjectionFromPointToLine,
  checkBoundary
}
from '../../src/libs/helper'

describe('Draw lock angle', () => {
  beforeEach(() => {
  })

  describe('solveSimultaneousEquations', () => {
    it('solve simultaneous equation which has solution', () => {
      // 3x - 2y = 4
      // 2x + y = 5
      const result = solveSimultaneousEquations(3, -2, 2, 1, 4, 5)
      expect(result.x).toEqual(2)
      expect(result.y).toEqual(1)
    })
  })

  describe('getClosestLine', () => {
    it('closest line is horizontal line', () => {
      const result = getClosestLine({x: 8, y: 4}, {x: 3, y: 3})
      expect(result[0]).toEqual(0)
      expect(result[1]).toEqual(1)
      expect(result[2]).toEqual(-3)
    })
    it('closest line is vertical line', () => {
      const result = getClosestLine({x: 4, y: 8}, {x: 3, y: 3})
      expect(result[0]).toEqual(1)
      expect(result[1]).toEqual(0)
      expect(result[2]).toEqual(-3)
    })
    it('closest line is 45 degree line', () => {
      const result = getClosestLine({x: 7, y: 8}, {x: 3, y: 3})
      expect(result[0]).toEqual(1)
      expect(result[1]).toEqual(-1)
      expect(result[2]).toEqual(-0)
    })
    it('closest line is 135 degree line', () => {
      const result = getClosestLine({x: -1, y: 8}, {x: 3, y: 3})
      expect(result[0]).toEqual(1)
      expect(result[1]).toEqual(1)
      expect(result[2]).toEqual(-6)
    })
  })

  describe('getDistanceFromPointToLine', () => {
    it('should return correct distance', () => {
      const result = getDistanceFromPointToLine({x: 1, y: 2}, [4, 3, -2])
      expect(result).toEqual(1.6)
      const result2 = getDistanceFromPointToLine({x: 3, y: 2}, [1, -1, 0])
      expect(result2).toBeCloseTo(Math.sqrt(0.5))
    })
  })

  describe('getProjectionFromPointToLine', () => {
    it('should return correct projection on horizontal line', () => {
      const result = getProjectionFromPointToLine({x: 10, y: 2}, [0, 1, -3])
      expect(result.x).toEqual(10)
      expect(result.y).toEqual(3)
    })

    it('should return correct projection on vertical line', () => {
      const result = getProjectionFromPointToLine({x: 10, y: 2}, [1, 0, -3])
      expect(result.x).toEqual(3)
      expect(result.y).toEqual(2)
    })
  })

  describe('checkBoundary', () => {
    it('checkBoundary return intersection', () => {
      const point = {x: 20, y: 20}
      const boundary = {minX: 0, minY: 0, maxX: 10, maxY: 10}
      const line = [1, -1, 0]
      const result = checkBoundary(point, boundary, line)
      expect(result.x).toEqual(10)
      expect(result.y).toEqual(10)
    })
  })
})
