import "./Components.css"

import Menu from "./Menu.jsx";

export default function Topbar({ username }) {
  return (
    <>
      <div className="topbar-contener">
        <div className="topbar-left">
          <div className="nifty ">
            <p>NIFTY 50</p>
            <p className="Red">0.00</p>
            <p>0</p>
          </div>
          <div className="Sensex">
            <p>SENSEX</p>
            <p className="Red">0.00</p>
            <p>0</p>
          </div>
        </div>
        <Menu username={username} />
      </div>
    </>
  );
}