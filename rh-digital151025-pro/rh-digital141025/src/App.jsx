import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Vagas from "./pages/Vagas.jsx";
import Perfil from "./pages/Perfil.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import "./pages/css/landing.css"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/vagas" element={<ProtectedRoute><Vagas /></ProtectedRoute>} />
        <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;