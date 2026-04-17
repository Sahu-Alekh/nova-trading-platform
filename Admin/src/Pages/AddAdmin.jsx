import { useState } from "react";
import axios from "axios";
import "../styles/login.css"; // Reusing login card styles for the form

const AddAdmin = () => {
  const [formData, setFormData] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axios.post("http://localhost:3003/createAdmin", formData);
      setMessage("Admin created successfully!");
      setFormData({ email: "", username: "", password: "" }); // reset
    } catch (err) {
      setError("Failed to create admin. Please try again.");
    }
  };

  return (
    <div className="page-container">
      <h2>Add New Admin</h2>
      <div className="card" style={{ maxWidth: "500px", marginTop: "20px" }}>
        {message && <p style={{ color: "green", marginBottom: "15px" }}>{message}</p>}
        {error && <p className="error">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              value={formData.username} 
              onChange={(e) => setFormData({...formData, username: e.target.value})} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={formData.email} 
              onChange={(e) => setFormData({...formData, email: e.target.value})} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={formData.password} 
              onChange={(e) => setFormData({...formData, password: e.target.value})} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Create Admin</button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;