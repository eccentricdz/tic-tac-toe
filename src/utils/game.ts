import { Board, EndResult, Markers } from "../types";

/**
 * Gets the winner of the game.
 */
export const getWinner = (board: Board): EndResult | undefined => {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== undefined && board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      return {
        winner: board[i][0],
        winningCombination: { direction: "row", index: i },
      }
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] !== undefined && board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    ) {
      return {
        winner: board[0][i],
        winningCombination: { direction: "column", index: i },
      }
    }
  }

  // Check diagonals
  if (
    board[0][0] !== undefined && board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return {
      winner: board[0][0],
      winningCombination: { direction: "diagonal", index: 0 },
    }
  }
  if (
    board[0][2] !== undefined && board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    return {
      winner: board[0][2],
      winningCombination: { direction: "diagonal", index: 1 },
    }
  }

  return undefined;
}

/**
 * @returns an empty board
 */
export const createEmptyBoard = (): Board => {
  return [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];
}

/**
 * @returns the string representation of a marker.
 */
export const markerToString = (marker?: Markers): string | undefined => marker === undefined ? marker : Markers[marker]

/**
 * Converts the winner value to a string representation.
 * @param winner - The winner value.
 * @returns The string representation of the winner.
 */
export const endResultToString = (endResult?: EndResult): string | undefined => endResult === undefined ? endResult : endResult.winner === undefined ? "It's a draw" : `${markerToString(endResult.winner)} wins the game`

/**
 * Converts the active marker to a string representation.
 * @param activeMarker - The active marker.
 * @returns The string representation of the active marker.
 */
export const waitingOnString = (activeMarker: Markers): string => `Waiting on ${markerToString(activeMarker)} to make a move`