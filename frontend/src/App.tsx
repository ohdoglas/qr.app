import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/public/Home";
import Generator from "./pages/public/Generator";
import NotFound from "./pages/public/NotFound";
import About from "./pages/public/About";
import History from "./pages/public/History";

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            <Route path="*" element={<NotFound />}/>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
