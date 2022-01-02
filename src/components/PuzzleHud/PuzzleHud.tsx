import RadioTileGroup from "../RadioTileGroup/RadioTileGroup";
import "./PuzzleHud.scss";

type PuzzleHudProps = {
  lives: number;
  penSelected: any;
  setPenSelected: any;
};

const PuzzleHud: React.FC<PuzzleHudProps> = ({
  lives,
  penSelected,
  setPenSelected,
}) => {
  const getHeartsFromLives = (lives: number) => {
    let livesText = "";

    for (let i = 0; i < lives; i++) {
      livesText += "❤️";
    }

    return livesText;
  };

  return (
    <div className="puzzle-hud">
      {/* TODO: create bespoke fieldset component for the following two components */}
      <fieldset className="puzzle-hud__life-count">
        <legend>Lives Left</legend>
        <span className="puzzle-hud__life-count-hearts">
          {getHeartsFromLives(lives)}
        </span>
      </fieldset>
      <RadioTileGroup
        penSelected={penSelected}
        updatePenSelected={setPenSelected}
      />
    </div>
  );
};

export default PuzzleHud;
