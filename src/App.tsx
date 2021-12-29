import { Link, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import "./styles/main.scss";
import HomeView from "./views/Home/Home";

const Test = () => {
  return (
    <Layout>
      <h1>Hello again</h1>
      <Link to="/">Home</Link>
    </Layout>
  );
};

const App = () => {
  return (
    <Routes>
      <Route index element={<HomeView />} />
      <Route path="/nested" element={<Test />} />
    </Routes>
  );
};

export default App;
