import classNames from "classnames";

type ClueProps = {
  completed: boolean;
  value: number;
};

const Clue: React.FC<ClueProps> = ({ completed, value }) => {
  const className = classNames("clue", {
    "clue--completed": completed,
  });

  return <span className={className}>{value}</span>;
};

export default Clue;
