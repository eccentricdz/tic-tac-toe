import { countBy, identity, isNotNil, prop } from "ramda";
import { EndResult, Markers, Score } from "../../../types";
import { immerable } from "immer";

export class Games {
    // At this time we are only storing the end results of the games.
    // We might extend this model to store more information in the future.
    results: Array<EndResult> = [];
    gameInProgress: boolean = true;

    static [immerable] = true;

    addResult(result: EndResult) {
        this.results.push(result);
        this.gameInProgress = false;
    }

    startAnotherGame() {
        this.gameInProgress = true;
    }

    get gamesCount(): number {
        return this.results.length + (this.gameInProgress ? 1 : 0);
    }

    get score(): Score {
        return {
            ...(countBy<Markers>(identity)(this.results.map(prop("winner")).filter(isNotNil))),
            totalGames: this.results.length
        } as Score
    }
}