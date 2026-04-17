import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/tables.css";

const Sales = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3003/fetchOrders")
      .then(res => { 
        setOrders(res.data); 
        setLoading(false); 
      })
      .catch(err => { 
        console.error(err); 
        setLoading(false); 
      });
  }, []);

  // Filter data based on the "mode" property
  const sellOrders = orders.filter(order => order.mode?.toLowerCase() === "sell");
  const buyOrders = orders.filter(order => order.mode?.toLowerCase() === "buy");

  const tableVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Fetching Transactions...</p>
    </div>
  );

  // Reusable Table Component to keep code clean
  const OrderTable = ({ title, data, typeColor }) => (
    <motion.div 
      className="card table-wrapper"
      variants={tableVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="table-header">
        <h3 style={{ color: typeColor }}>{title}</h3>
        <span className="badge">{data.length} Transactions</span>
      </div>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Mode</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => (
            <motion.tr 
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <td><strong>{order.username}</strong></td>
              <td>{order.name}</td>
              <td>{order.qty}</td>
              <td className="price-cell">₹{order.price}</td>
              <td>
                <span className={`mode-pill ${order.mode?.toLowerCase()}`}>
                  {order.mode}
                </span>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </motion.tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: "center", padding: "40px", color: "#888" }}>
                No {title.toLowerCase()} found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </motion.div>
  );

  return (
    <div className="page-container">
      <header className="page-header">
        <h2>Financial Ledger</h2>
        <p>Tracking all buy and sell transactions</p>
      </header>

      {/* Sell Table - Top */}
      <OrderTable title="Sales Overview" data={sellOrders} typeColor="#0f4c81" />

      <div className="spacer" style={{ height: "40px" }}></div>

      {/* Buy Table - Bottom */}
      <OrderTable title="Purchase Overview" data={buyOrders} typeColor="#e67e22" />
    </div>
  );
};

export default Sales;