import { compose, count, unnest, isNotNil } from 'ramda'

/**
 * Counts the number of non-null and non-undefined values in a 2D array.
 *
 * @param board - The 2D array to count non-null and non-undefined values from.
 * @returns The number of non-null and non-undefined values in the array.
 */
export const countNotNil = compose(count(isNotNil), unnest) as unknown as (<T>(board: T[][]) => number);