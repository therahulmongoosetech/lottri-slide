import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LottriPage from "./container/LottriPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LottriPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
