import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./SingUp.css";

const Login = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({
        email: "",
        password: "",
    });
    const { email, password } = inputValue;
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
            position: "bottom-left",
        });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:3003/login",
                { ...inputValue },
                { withCredentials: true }
            );
            
            console.log("Backend Response:", data);

            const { success, message, user } = data;

            if (success) {
                handleSuccess(message);

                setTimeout(() => {
                    const usernameParam = user?.username ? `?username=${user.username}` : "";

                    window.location.href = `http://localhost:5174/${usernameParam}`;
                }, 1500);

            } else {
                handleError(message);
            }
        } catch (error) {
            console.log(error);
            handleError("Login failed");
        }

        setInputValue({
            email: "",
            password: "",
        });
    };

    return (
        <div className="login-page-wrapper d-flex align-items-center justify-content-center">
            <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4 fw-bold text-primary">Login Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control form-control-lg custom-input"
                            value={email}
                            placeholder="Enter your email"
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" aria-label="password label" className="form-label fw-semibold">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control form-control-lg custom-input"
                            value={password}
                            placeholder="Enter your password"
                            onChange={handleOnChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg w-100 fw-bold shadow-sm mb-3">
                        Login
                    </button>
                    <div className="text-center">
                        <span className="text-muted">
                            Don't have an account? <Link to={"/signup"} className="text-decoration-none fw-bold">Signup</Link>
                        </span>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;