import { useContext } from "react"
import { GameContext, GameContextType } from "../components/Game";

export const useGameContext = (): GameContextType => useContext(GameContext) as GameContextType;