import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import GameDetailsPage from "./pages/GameDetailsPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/:id" element={<GameDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
