import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useCookies } from "react-cookie";

import "./Components.css"

export default function Menu({ username }) {
    const [selectMenu, setSelectMenu] = useState(0);
    const [isProfileDropdown, setIsProfileDropdown] = useState(false);
    const [cookies, removeCookie] = useCookies([]);
    const [isToggle, setIsToggle] = useState(false);

    const handleMenuClick = (index) => {
        setSelectMenu(index);
    }

    const handleProfileClick = () => {
        setIsProfileDropdown(!isProfileDropdown);
    }

    const handleToggle = () => {
        const nextToggle = !isToggle;
        setIsToggle(nextToggle);

        if (nextToggle) {
            document.body.classList.add("dark-theme");
        } else {
            document.body.classList.remove("dark-theme");
        }
    }

    const menuClass = "menu";
    const activeMenuClass = "menu-active";

    const Logout = () => {
        removeCookie("token");
        window.location.href = "https://nova-frontend-opym.onrender.com/login";
    };

    return (
        <>
            <div className="">
                <div className="topbar-right">
                    <div className="">
                        <img className="menu-img" src="./logo.png" alt="" />
                    </div>
                    <div className="menu-items">
                        <ul>
                            <li>
                                <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
                                    <p className={selectMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
                                </Link>
                            </li>
                            <li>
                                <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
                                    <p className={selectMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
                                </Link>
                            </li>
                            <li>
                                <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
                                    <p className={selectMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
                                </Link>
                            </li>
                            <li>
                                <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
                                    <p className={selectMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
                                </Link>
                            </li>
                            <li>
                                <Link style={{ textDecoration: "none" }} to="/funds" onClick={() => handleMenuClick(4)}>
                                    <p className={selectMenu === 4 ? activeMenuClass : menuClass}>Funds</p>
                                </Link>
                            </li>
                            <li>
                                <Link style={{ textDecoration: "none" }} to="/apps" onClick={() => handleMenuClick(6)}>
                                    <p className={selectMenu === 6 ? activeMenuClass : menuClass}>Apps</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="profile" onClick={handleProfileClick}>
                        <p className="Avatar">{username.substring(0, 2).toUpperCase()}</p>
                        <button className="btn btn-primary" onClick={Logout}>LOGOUT</button>
                        <div className="Dark-white" onClick={handleToggle}>
                            {isToggle ? <i class="fa-solid fa-sun"></i> : <i class="fa-solid fa-moon"></i>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
