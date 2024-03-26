import { useGameContext } from "../../hooks";
import { waitingOnString, endResultToString } from "../../utils/game";

export const GameBoardStatus: React.FC = () => {
  const [{ endResult, activeMarker }] = useGameContext();

  return (
    <div className="status">
      <p>{endResultToString(endResult) ?? waitingOnString(activeMarker)}</p>
    </div>
  );
};
