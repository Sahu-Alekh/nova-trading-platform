import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/tables.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3003/allUsers")
      .then(res => { setUsers(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  if (loading) return <div className="loading">Loading Users...</div>;

  return (
    <div className="page-container">
      <h2>All Users</h2>
      <div className="card table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan="3" style={{textAlign:"center"}}>No users found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;