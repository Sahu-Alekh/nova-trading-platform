import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./SingUp.css";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { email, password, username } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !username)
      return handleError("All fields are required");

    if (password.length < 6)
      return handleError("Password must be at least 6 characters");

    try {
      const { data } = await axios.post(
        "http://localhost:3003/signup",
        inputValue,
        { withCredentials: true }
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.error("Axios Error Details:", error); // LOOK AT YOUR BROWSER CONSOLE
      if (error.response) {
        handleError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        handleError("Server is down or CORS issue");
      } else {
        handleError("Request setup error");
      }
    }

    setInputValue({
      email: "",
      password: "",
      username: "",
    });
  };

  return (
    // ... inside your return statement
    <div className="signup_container d-flex align-items-center justify-content-center">
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4 fw-bold text-primary">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-control form-control-lg custom-input"
              value={email}
              placeholder="name@example.com"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-semibold">Username</label>
            <input
              type="text"
              name="username"
              className="form-control form-control-lg custom-input"
              value={username}
              placeholder="johndoe123"
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control form-control-lg custom-input"
              value={password}
              placeholder="••••••••"
              onChange={handleOnChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm mb-3">
            Sign Up
          </button>
          <div className="text-center">
            <span className="text-muted">
              Already have an account? <Link to={"/login"} className="text-decoration-none fw-bold">Login</Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;