import classNames from "classnames";
import "./ClueContainer.scss";

type ClueContainerProps = {
  clues: JSX.Element[];
  isColumn: boolean;
};

const ClueContainer: React.FC<ClueContainerProps> = ({ clues, isColumn }) => {
  const className = classNames("clue-container", {
    "clue-container--column": isColumn,
  });

  return <div className={className}>{clues}</div>;
};

export default ClueContainer;
