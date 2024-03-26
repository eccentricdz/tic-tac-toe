import React, { useContext } from "react";
import { Games } from "../components/Games";
import { useImmer } from "use-immer";

export type GamesContextType = ReturnType<typeof useImmer<Games>>;
export const GamesContext = React.createContext<GamesContextType | undefined>(undefined);

type UseGamesContextResult = Pick<Games, 'addResult' | 'startAnotherGame' | "results">

export const useGamesContext = (): UseGamesContextResult => {
    const [{ results }, updateGames] = useContext(GamesContext) as GamesContextType;

    const addResult: UseGamesContextResult['addResult'] = (result) => {
        updateGames((draft) => {
            draft.addResult(result);
        });
    }

    const startAnotherGame: UseGamesContextResult['startAnotherGame'] = () => {
        updateGames((draft) => {
            draft.startAnotherGame();
        });
    }

    return { addResult, startAnotherGame, results }
}