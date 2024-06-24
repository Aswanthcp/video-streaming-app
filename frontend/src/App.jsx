import React from "react";
import { Routes, Route } from "react-router-dom";
import VideoList from "./pages/VideoList";
import VideoGallery from "./pages/VideoGallery";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<VideoList />} />
      <Route path="/videos/:id" element={<VideoGallery />} />
    </Routes>
  );
};

export default App;
