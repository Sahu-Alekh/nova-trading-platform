import { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual backend URLs
        const userRes = await axios.get("http://localhost:3003/allUsers");
        const orderRes = await axios.get("http://localhost:3003/fetchOrders");
        setUsers(userRes.data);
        setOrders(orderRes.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dashboard data. Make sure backend is running.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Process data for charts
  const userChartData = users.reduce((acc, user) => {
    const month = new Date(user.createdAt).toLocaleString('default', { month: 'short' });
    const existingMonth = acc.find(item => item.name === month);
    if (existingMonth) { existingMonth.users += 1; }
    else { acc.push({ name: month, users: 1 }); }
    return acc;
  }, []);

  // Process data for DAILY Bar Chart
  const dailyChartData = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });

    const existingDate = acc.find(item => item.name === date);
    if (existingDate) {
      existingDate.count += 1;
    } else {
      acc.push({ name: date, count: 1, fullDate: new Date(user.createdAt) });
    }
    return acc;
  }, [])
    .sort((a, b) => a.fullDate - b.fullDate); // Sort by actual date so chart is chronological

  if (loading) return <div className="loading">Loading Dashboard...</div>;

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      {error && <div className="error">{error}</div>}

      <div className="stats-grid">
        <div className="card stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">{users.length}</p>
        </div>
        <div className="card stat-card">
          <h3>Total Orders</h3>
          <p className="stat-number">{orders.length}</p>
        </div>
      </div>

      <div className="card chart-card">
        <h3>User Registrations (Monthly)</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={userChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#0f4c81" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card chart-card">
        <h3>Daily User Registrations</h3>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyChartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "8px" }}
                cursor={{ fill: '#f0f0f0' }}
              />
              <Bar dataKey="count" fill="#4caf50" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;