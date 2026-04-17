import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Add state for errors
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3003/loginadmin", { 
        email, 
        password 
      });

      if (response.data.token) {
        // Save the real token from the database
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("adminName", response.data.username);
        navigate("/dashboard");
      }
    } catch (err) {
      // Handle 401 or 500 errors from backend
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        
        {/* Display error message if login fails */}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;