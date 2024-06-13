import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VideoPage from "./components/VideoPage";
import SimilarVideos from "./components/SimilarVideos";
import LandingPage from "./pages/Landing";
import HomePage from "./components/HomePage";
import SubscribePage from "./pages/SubscribePage";
import OtpPage from "./pages/OtpPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if MSISDN is present in localStorage
    const msisdn = localStorage.getItem("MSISDN");
    if (msisdn) {
      // If MSISDN is present, set isAuthenticated to true
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          /> 
          {/* <Route path="/video" element={<HomePage/>}/> */}
         <Route
            path="/video"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/" />}
          />
           {/* <Route index element={<HomePage/>}/> */}
          <Route path="/videos/:id" element={<VideoPage />} />
          <Route path="/index" element={<SimilarVideos />} />
          <Route path="/subscribe" element={<SubscribePage/>}/>
          <Route path="/otp" element={<OtpPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
