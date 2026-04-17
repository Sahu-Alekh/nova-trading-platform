import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg border-bottom">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    {/* 1. Width increased to 250px, Height remains 70px */}
                    <img
                        src="/images/Logo.png"
                        style={{ width: "250px", height: "70px", objectFit: "contain" }}
                        alt=""
                    />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* 2. Added 'ms-auto' to push content to the end (right) */}
                    <form className="d-flex ms-auto" role="search">
                        <ul className="navbar-nav mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link fs-6" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-6" to="/products">Product</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-6" to="/pricing">Pricing</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link fs-6" to="/support">Support</Link>
                            </li>
                            <li className="nav-item d-flex align-items-center">
                                <Link className="nav-link fs-6" aria-current="page" to="/signup">Signup</Link>/<Link className="fs-6" aria-current="page" to="/Login">Login</Link>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </nav>
    );
}
