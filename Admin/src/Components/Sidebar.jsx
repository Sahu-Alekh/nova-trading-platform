import { Link, useNavigate } from "react-router-dom";
import { FaChartPie, FaUsers, FaShoppingCart, FaUserPlus, FaSignOutAlt } from "react-icons/fa";
import "../styles/sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="admin-profile">
        <h2>👤 Admin - {localStorage.getItem("adminName")}</h2>
      </div>
      <nav className="nav-menu">
        <Link to="/dashboard"><FaChartPie /> Dashboard</Link>
        <Link to="/users"><FaUsers /> Users</Link>
        <Link to="/sales"><FaShoppingCart /> Sales</Link>
        <Link to="/add-admin"><FaUserPlus /> Add Admin</Link>
        <button onClick={handleLogout} className="logout-btn">
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;