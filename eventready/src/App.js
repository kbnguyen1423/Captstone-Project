import React from "react";
import HelloWorld from "./HelloWorld";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { EventPage } from "./pages/EventPage";
import GeneralInfoPage from "./pages/GeneralInfoPage";
import Attendence from "./pages/Attendence";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/helloworld" element={<HelloWorld />} />
        <Route path="/generalinfo" element={<GeneralInfoPage />} />
        <Route path="/Attendence" element={<Attendence />} />
      </Routes>
    </>
  );
}

export default App;
