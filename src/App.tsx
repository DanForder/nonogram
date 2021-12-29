import { Route, Routes } from "react-router-dom";
import "./styles/main.scss";
import HomeView from "./views/Home/Home";
import PuzzleView from "./views/Puzzle/Puzzle";

const App = () => {
  return (
    <Routes>
      <Route index element={<HomeView />} />
      <Route path="/puzzles/:id" element={<PuzzleView />} />
    </Routes>
  );
};

export default App;
