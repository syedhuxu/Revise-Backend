import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./components/PretectedRoute";

import LoginRegister from "./auth/LoginRegister";

import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<LoginRegister />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
