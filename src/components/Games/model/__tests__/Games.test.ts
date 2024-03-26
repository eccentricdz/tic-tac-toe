import { Games } from "../Games";
import { EndResult, Markers, Score } from "../../../../types";
import { describe, beforeEach, test, expect } from "vitest";

describe("Games", () => {
    let games: Games;

    beforeEach(() => {
        games = new Games();
    });

    test("should initialize with an empty results array", () => {
        expect(games.results).toEqual([]);
    });

    test("should initialize with gameInProgress set to true", () => {
        expect(games.gameInProgress).toBe(true);
    });

    test("should add a result to the results array", () => {
        const result: EndResult = {
            winner: Markers.X,
            winningCombination: { direction: "row", index: 0 },
        };

        games.addResult(result);

        expect(games.results).toEqual([result]);
    });

    test("should set gameInProgress to false after adding a result", () => {
        const result: EndResult = {
            winner: Markers.X,
            winningCombination: { direction: "row", index: 0 },
        };

        games.addResult(result);

        expect(games.gameInProgress).toBe(false);
    });

    test("should start another game by setting gameInProgress to true", () => {
        games.startAnotherGame();

        expect(games.gameInProgress).toBe(true);
    });

    test("should return the correct number of games", () => {
        const result1: EndResult = {
            winner: Markers.X,
            winningCombination: { direction: "row", index: 0 },
        };
        const result2: EndResult = {
            winner: Markers.O,
            winningCombination: { direction: "column", index: 1 },
        };

        games.addResult(result1);
        games.addResult(result2);
        games.startAnotherGame();

        expect(games.gamesCount).toBe(3); // 2 results + 1 game in progress
    });

    test("should return the correct score", () => {
        const result1: EndResult = {
            winner: Markers.X,
            winningCombination: { direction: "row", index: 0 },
        };
        const result2: EndResult = {
            winner: Markers.O,
            winningCombination: { direction: "column", index: 1 },
        };

        games.addResult(result1);
        games.addResult(result2);
        games.addResult({});

        const expectedScore: Score = {
            [Markers.X]: 1,
            [Markers.O]: 1,
            totalGames: 3,
        };

        expect(games.score).toEqual(expectedScore);
    });
});