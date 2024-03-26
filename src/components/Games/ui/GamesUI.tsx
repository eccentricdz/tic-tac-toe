import React from "react";
import { useImmer } from "use-immer";
import { Games } from "../model/Games";
import { GamesContext } from "../../../hooks/useGamesContext";
import { GameUI } from "../../Game";
import "./Games.css";
import { Carousel } from "../../Carousel/Carousel";
import { Button } from "../../Button";
import { ScoreBoard } from "../../ScoreBoard";

/**
 * The UI component for the Games.
 */
export const GamesUI: React.FC = () => {
  const gamesContext = useImmer(new Games());
  const [{ gamesCount, gameInProgress, score }, updateGames] = gamesContext;

  return (
    <GamesContext.Provider value={gamesContext}>
      <div className="games">
        <ScoreBoard {...score} />
        <Carousel
          windowSize={{
            width: 308,
          }}
          itemCount={gamesCount}
          getHeader={(index) => <p>Game {index + 1}</p>}
        >
          {Array.from(Array(gamesCount).keys()).map((_, index) => (
            <GameUI key={index} id={index} />
          ))}
        </Carousel>

        {!gameInProgress && (
          <div className="actions">
            <Button
              onClick={() => updateGames((draft) => draft.startAnotherGame())}
            >
              Start Another Game
            </Button>
          </div>
        )}
      </div>
    </GamesContext.Provider>
  );
};
