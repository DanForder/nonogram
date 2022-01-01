import { Link } from "react-router-dom";
import "./TileLink.scss";

type TileLinkProps = {
  to: string;
  text: string;
};

const TileLink: React.FC<TileLinkProps> = ({ to, text }) => {
  return (
    <Link to={to} className="tile-link">
      {text}
    </Link>
  );
};

export default TileLink;
