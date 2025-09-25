import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/patient/Patients";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AuthLayout from "./layout/AuthLayout";

function App() {
  const isLoggedIn = localStorage.getItem("user");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <AuthLayout><Dashboard /></AuthLayout> : <Navigate to="/login" />}
        />
        <Route
          path="/patients"
          element={isLoggedIn ? <AuthLayout><Patients /></AuthLayout> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
