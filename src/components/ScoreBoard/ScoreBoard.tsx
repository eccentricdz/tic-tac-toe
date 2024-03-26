import { Markers, Score } from "../../types";
import { markerToString } from "../../utils/game";
import "./ScoreBoard.css";

const ScoreElement: React.FC<{
  label?: string;
  value: number;
  winner?: boolean;
}> = ({ label, value, winner = false }) => {
  return label || value ? (
    <div
      className={`score-element ${label ?? "draw"} ${winner ? "winner" : ""}`}
      style={{ flex: value }}
    >
      <p className="label">{label}</p>
      <div className="value-bar" data-value={value} />
      <p className="value">{value}</p>
    </div>
  ) : null;
};

export const ScoreBoard: React.FC<Score> = (score) => {
  const { totalGames = 0 } = score;
  const [X, O] = [score[1] ?? 0, score[0] ?? 0];

  return totalGames ? (
    <div className="score-board">
      <div className="score">
        <ScoreElement
          label={markerToString(Markers.X) as string}
          value={X}
          winner={X > O}
        />
        <ScoreElement value={totalGames - X - O} />
        <ScoreElement
          label={markerToString(Markers.O) as string}
          value={O}
          winner={X < O}
        />
      </div>
    </div>
  ) : null;
};
