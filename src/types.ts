export enum Markers {
    "O",
    "X"
}

export type WinningCombination = {
    direction: "row" | "column" | "diagonal";
    index: number;
};

/**
 * Represents the end result of the game.
 * If it is undefined, it signifies that the game is in progress.
 * If it is defined, but the winner is undefined, it signifies a draw.
 * Otherwise, it signifies the winner of the game and the winning combination.
 */
export type EndResult = {
    winner?: Markers;
    winningCombination?: WinningCombination;
};

/**
 * Represents the score tally for all the games played so far.
 */
export type Score = {
    totalGames: number;
} & Record<Markers, number>



export type BoardMarker = Markers | undefined;

/**
 * Represents a row on the tic-tac-toe board.
 * Each row consists of three board slots.
 */
export type BoardRow = [BoardMarker, BoardMarker, BoardMarker];
export type Board = [BoardRow, BoardRow, BoardRow];