import React from "react";
import { Routes, Route } from "react-router-dom";

import WelcomePage from "./components/Welcome";
import Game from "./components/Game";
import Scoreboard from "./components/Scoreboard";

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/game" element={<Game />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
      </Routes>
    </div>
  )
};