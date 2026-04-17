import { useState, useEffect } from "react";
import Topbar from "./Topbar";
import Dashboard from "./Dashboard";

import "./Components.css"

export default function Home() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  return (
    <div className="home">
      <Topbar username={username} />
      <Dashboard />
    </div>
  );
}