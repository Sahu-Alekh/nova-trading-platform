import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route } from "react-router-dom"

import Watchlist from "./Watchlist";
import Summary from "./Summary";
import Fund from "./Funds";
import Holding from "./Holding";
import Orders from "./Orders";
import Positions from "./Positions";
import App from "./App";
import { GeneralContextProvider } from "./GeneralContext";

import "./Components.css"

export default function Dashboard() {
    const [username, setUsername] = useState("");

    useEffect(() => {
        // 1. Check if the username is in the URL
        const params = new URLSearchParams(window.location.search);
        const urlUsername = params.get("username");

        if (urlUsername) {
            // 2. Save it to App 2's localStorage
            localStorage.setItem("username", urlUsername);
            setUsername(urlUsername);

            // 3. Clean up the URL so the user doesn't see ?username=...
            window.history.replaceState({}, document.title, window.location.pathname);
        } else {
            // 4. If not in URL, check if App 2 already saved it previously
            const storedUsername = localStorage.getItem("username");
            if (storedUsername) {
                setUsername(storedUsername);
            }
        }
    }, []);
    return (
        <div className="dashboard">
            <div className="dashboard-watchlist">
                <GeneralContextProvider>
                    <Watchlist username={username} />
                </GeneralContextProvider>
            </div>
            <div className="content">
                <Routes>
                    <Route exact path="/" element={<Summary username={username} />} />
                    <Route path="/orders" element={<Orders username={username}/>} />
                    <Route path="/holdings" element={<Holding username={username}/>} />
                    <Route path="/positions" element={<Positions username={username}/>} />
                    <Route path="/funds" element={<Fund username={username}/>} />
                    <Route path="/apps" element={<App />} />
                </Routes>
            </div>
        </div>
    );
}