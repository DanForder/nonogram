import classNames from "classnames";
import { Link } from "react-router-dom";
import "./TileLink.scss";

type TileLinkProps = {
  to: string;
  text: React.ReactText;
  highlighted?: boolean;
};

const TileLink: React.FC<TileLinkProps> = ({
  to,
  text,
  highlighted = false,
}) => {
  const className = classNames("tile-link", {
    "tile-link--highlighted": highlighted,
  });
  return (
    <Link to={to} className={className}>
      {text}
    </Link>
  );
};

export default TileLink;
