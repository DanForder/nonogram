import RadioTile from "../RadioTile/RadioTile";
import "./RadioTileGroup.scss";

type RadioTileGroupProps = {
  penSelected: boolean;
  updatePenSelected: any;
};

const RadioTileGroup: React.FC<RadioTileGroupProps> = ({
  penSelected,
  updatePenSelected,
}) => {
  return (
    <fieldset className="radio-tile-group">
      <legend>User input toggle</legend>
      <RadioTile
        onChange={() => {
          updatePenSelected(true);
        }}
        checked={penSelected}
        labelText="✒️"
        name="input-toggle"
      />
      <RadioTile
        onChange={() => {
          updatePenSelected(false);
        }}
        checked={!penSelected}
        labelText="❌"
        name="input-toggle"
      />
    </fieldset>
  );
};

export default RadioTileGroup;
