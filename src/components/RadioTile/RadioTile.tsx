import classNames from "classnames";
import getUniqueId from "../../utils/guidUtils";
import "./RadioTile.scss";

type RadioTileProps = {
  onChange: any;
  checked: boolean;
  labelText: string;
  name: string;
};

const RadioTile: React.FC<RadioTileProps> = ({
  onChange,
  checked,
  labelText,
  name,
}) => {
  const uniqueId = getUniqueId();

  const rootClassName = classNames("radio-tile", {
    "radio-tile--selected": checked,
  });
  return (
    <div className={rootClassName}>
      <label className="radio-tile__label" htmlFor={uniqueId}>
        {labelText}
      </label>
      <input
        className="radio-tile__input"
        type="radio"
        name={name}
        id={uniqueId}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
};

export default RadioTile;
