import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/public/Home";
import Generator from "./pages/public/Generator";

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
