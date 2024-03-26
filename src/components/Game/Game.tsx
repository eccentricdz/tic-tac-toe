import { Markers, Board, BoardMarker, BoardRow, EndResult } from "../../types";
import { useImmer } from "use-immer";
import { immerable } from "immer";
import { countNotNil } from "../../utils/fp";
import { createEmptyBoard, getWinner, markerToString } from "../../utils/game";
import React, { useEffect, useState } from "react";
import "./Game.css";
import { GameBoardStatus } from "./GameBoardStatus";
import { useGameContext } from "../../hooks";
import { useGamesContext } from "../../hooks/useGamesContext";

/**
 * Encapsulates the game logic for Tic Tac Toe.
 */
export class Game {
  activeMarker: Markers;
  board: Board;

  static [immerable] = true;

  constructor(id: number = 0) {
    this.activeMarker = id % 2 === 0 ? Markers.X : Markers.O;
    this.board = createEmptyBoard();
  }

  /**
   * Gets the count of non-null markers on the board.
   */
  get markersCount(): number {
    return countNotNil(this.board);
  }

  /**
   * Gets the winner of the game.
   */
  get endResult(): EndResult | undefined {
    if (this.markersCount < 5) return undefined;
    return getWinner(this.board) ?? (this.markersCount === 9 ? {} : undefined);
  }

  /**
   * Marks the board with the active marker at the specified position.
   * @param row - The row index of the position.
   * @param col - The column index of the position.
   */
  markBoard(row: number, col: number) {
    if (this.board[row][col] === undefined && this.endResult === undefined) {
      this.board[row][col] = this.activeMarker;
      this.activeMarker =
        this.activeMarker === Markers.X ? Markers.O : Markers.X;
    }
  }
}

type GameBoardSlotProps = {
  rowIndex: number;
  colIndex: number;
  marker: BoardMarker;
};

const GameBoardSlot: React.FC<GameBoardSlotProps> = ({
  rowIndex,
  colIndex,
  marker,
}) => {
  const [game, updateGame] = useGameContext();
  const [hoverActive, setHoverActive] = useState(false);
  const { endResult, activeMarker } = game;
  const showDimmedMarker =
    hoverActive && marker === undefined && endResult === undefined;

  const markBoard = () => {
    showDimmedMarker &&
      updateGame((draft) => {
        draft.markBoard(rowIndex, colIndex);
      });
  };

  return (
    <div
      className="slot"
      onClick={markBoard}
      onMouseOver={() => setHoverActive(true)}
      onMouseLeave={() => setHoverActive(false)}
    >
      <p className={`marker ${showDimmedMarker ? "dimmed" : ""}`}>
        {markerToString(showDimmedMarker ? activeMarker : marker)}
      </p>
    </div>
  );
};

type GameBoardRowProps = {
  row: BoardRow;
  rowIndex: number;
};

const GameBoardRow: React.FC<GameBoardRowProps> = ({ row, rowIndex }) => {
  return (
    <div className="row">
      {row.map((marker, colIndex) => (
        <GameBoardSlot
          key={colIndex}
          marker={marker}
          rowIndex={rowIndex}
          colIndex={colIndex}
        />
      ))}
    </div>
  );
};

export const GameBoard: React.FC = () => {
  const [game] = useGameContext();
  const { board, endResult } = game;
  const { winningCombination } = endResult ?? {};

  return (
    <div className={`board`}>
      {winningCombination && (
        <div
          className={`winco ${`winco-${winningCombination.direction}-${winningCombination.index}`} ${`winco-${winningCombination.direction}`}`}
        />
      )}
      {board.map((row, index) => (
        <GameBoardRow key={index} row={row} rowIndex={index} />
      ))}
    </div>
  );
};

export type GameContextType = ReturnType<typeof useImmer<Game>>;
export const GameContext = React.createContext<GameContextType | undefined>(
  undefined
);

export const GameUI: React.FC<{ id: number }> = ({ id }) => {
  const gameContext = useImmer(new Game(id));
  const { addResult, results } = useGamesContext();
  const [{ endResult }] = gameContext;

  useEffect(() => {
    if (endResult && !results[id]) {
      addResult(endResult);
    }
  }, [endResult, addResult, results, id]);

  return (
    <GameContext.Provider value={gameContext}>
      <div className={`game ${gameContext[0].endResult ? "settled" : ""}`}>
        <GameBoard />
        <GameBoardStatus />
      </div>
    </GameContext.Provider>
  );
};
