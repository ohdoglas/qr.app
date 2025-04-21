import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/public/Home";
import Generator from "./pages/public/Generator";
import NotFound from "./pages/public/NotFound";

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/404-not-found" element={<NotFound />}/>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
