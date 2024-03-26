import { test, expect } from 'vitest'
import { countNotNil } from '../fp'

test('counts non-null values in a 2D array', () => {
  const array = [[1, 2, null], [4, null, 6], [null, null, null]]
  expect(countNotNil(array)).toBe(4)
})

test('returns 0 for an empty array', () => {
  const array = [] as number[][]
  expect(countNotNil(array)).toBe(0)
})

test('returns 0 for an array with only null values', () => {
  const array = [[null, null], [null, null]]
  expect(countNotNil(array)).toBe(0)
})