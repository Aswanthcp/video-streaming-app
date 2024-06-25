import React from "react";
import { Routes, Route } from "react-router-dom";
import VideoList from "./pages/VideoList";
import VideoGallery from "./pages/VideoGallery";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "./auth/Redux/authReducer";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();

  function Logout() {
    localStorage.clear();
    dispatch(setLogout());
    return <Navigate to="/login" />;
  }
  function RegisterAndLogout() {
    localStorage.clear();
    dispatch(setLogout());
    return <Register />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<RegisterAndLogout />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<VideoList />} />
      <Route
        path="/videos/:id"
        element={
          <ProtectedRoute>
            <VideoGallery />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
