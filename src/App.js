import "./App.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/movie/:movieId" exact element={<Detail type="movie" />} />
        <Route path="/tv/:tvId" exact element={<Detail type="tv" />} />
      </Routes>
    </Router>
  );
}

export default App;
