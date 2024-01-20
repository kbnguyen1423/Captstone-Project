import React from "react";
import HelloWorld from "./HelloWorld";
import {Routes, Route, BrowserRouter } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { EventPage } from "./pages/EventPage";
import GeneralInfoPage from "./pages/GeneralInfoPage";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>

      <Routes>
        <Route path="/event" element={<Navigation />}>
          <Route path="generalinfo" element={<GeneralInfoPage />} />
          <Route path="helloworld" element={<HelloWorld />} />
        </Route>
        
        <Route path="/" element={<LandingPage />} />
        
    
        
      </Routes>
    </>
  );
}

export default App;
