import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import Sales from "./Pages/Sales";
import AddAdmin from "./Pages/AddAdmin";
import "./styles/global.css";

// Simple wrapper to check if admin is logged in (checking localStorage)
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? (
    <div className="admin-layout">
      <Sidebar />
      <div className="main-content">{children}</div>
    </div>
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
        <Route path="/sales" element={<PrivateRoute><Sales /></PrivateRoute>} />
        <Route path="/add-admin" element={<PrivateRoute><AddAdmin /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;