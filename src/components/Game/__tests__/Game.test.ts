import { Markers } from "../../../types";
import { Game } from "../Game";
import { describe, beforeEach, test, expect } from "vitest";

describe("Game", () => {

  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  test("should initialize with activeMarker as X", () => {
    expect(game.activeMarker).toBe(Markers.X);
  });

  test("should initialize with an empty board", () => {
    expect(game.board).toEqual([
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);
  });

  test("should return the correct markers count", () => {
    expect(game.markersCount).toBe(0);

    game.markBoard(0, 0);
    game.markBoard(1, 1);

    expect(game.markersCount).toBe(2);
  });

  test("should return the correct winner", () => {
    expect(game.endResult).toBeUndefined();

    game.markBoard(0, 0);
    game.markBoard(1, 0);
    game.markBoard(0, 1);
    game.markBoard(1, 1);
    game.markBoard(0, 2);

    expect(game.endResult).toEqual({
      winner: Markers.X,
      winningCombination: { direction: "row", index: 0 },
    });
  });

  test("should return the correct winner when O wins", () => {
    expect(game.endResult).toBeUndefined();

    game.markBoard(0, 0); // X
    game.markBoard(1, 0); // O
    game.markBoard(0, 1); // X
    game.markBoard(1, 1); // O
    game.markBoard(2, 2); // X
    game.markBoard(1, 2); // O

    expect(game.endResult).toEqual({
      winner: Markers.O,
      winningCombination: { direction: "row", index: 1 },
    });
  });

  test("should result in a draw", () => {
    game.markBoard(0, 0); // X
    game.markBoard(0, 1); // O
    game.markBoard(0, 2); // X

    game.markBoard(1, 2); // O
    game.markBoard(1, 0); // X
    game.markBoard(1, 1); // O

    game.markBoard(2, 2); // X
    game.markBoard(2, 0); // O
    game.markBoard(2, 1); // X

    expect(game.endResult).toEqual({});
  });

  test("should mark the board correctly", () => {
    game.markBoard(0, 0);
    expect(game.board).toEqual([
      [Markers.X, undefined, undefined],
      [undefined, undefined, undefined],
      [undefined, undefined, undefined],
    ]);

    game.markBoard(1, 1);
    expect(game.board).toEqual([
      [Markers.X, undefined, undefined],
      [undefined, Markers.O, undefined],
      [undefined, undefined, undefined],
    ]);
  });
});
