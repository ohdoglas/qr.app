import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/public/Home";

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route>
            <Route path="/" element={<Home />}/>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;
