import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";

export const HomeView = () => {
  return (
    <Layout>
      <h1>Welcome to Nonogram Puzzler</h1>
      <Link to="puzzles/1">Puzzle 1</Link>
    </Layout>
  );
};

export default HomeView;
