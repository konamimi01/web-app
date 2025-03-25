import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Error from "./Pages/Error";

import Shiori2025Bnpk from './Pages/Shiori2025Bnpk';
import Quiz from './Pages/Quiz';

const homeUrl = process.env.PUBLIC_URL;

function App() {
  return (
    <Router>
      <Routes>
        <Route path={homeUrl} element={<Home />} />

        <Route path={homeUrl+"/Shiori2025Bnpk"} element={<Shiori2025Bnpk />} />

        <Route path={homeUrl+"/quiz"} element={<Quiz />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
