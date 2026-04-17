import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Components.css";

export default function Orders({ username }) {
    const [allOrders, setAllOrders] = useState([]);
    const [SellOrders, setSellOrders] = useState([]);

    useEffect(() => {
        if (username) {
            axios
                .get(`https://nova-backend-gvud.onrender.com/allOrders?username=${username}`)
                .then((res) => {
                    setAllOrders(res.data);
                })
                .catch((err) => console.error("Error fetching orders:", err));
        }
    }, [username]);

    useEffect(() => {
        if (username) {
            axios
                .get(`http://localhost:3003/getSellOrders?username=${username}`)
                .then((res) => {
                    setSellOrders(res.data);
                })
                .catch((err) => console.error("Error fetching sell orders:", err));
        }
    }, [username]);

    const buyOrders = allOrders.filter(order => order.mode.toLowerCase() === "buy");
    const sellOrders = SellOrders;

    const OrderTable = ({ orders, title, typeClass }) => (
        <div className={`order-section ${typeClass}`}>
            <h2>{title} ({orders.length})</h2>
            <div className="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>Instrument</th>
                            <th>Qty.</th>
                            <th>Price</th>
                            <th>Total Value</th>
                            <th>Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => {
                            const totalValue = order.qty * order.price;
                            const orderDate = new Date(order.createdAt).toLocaleDateString();

                            return (
                                <tr key={order._id || index}>
                                    <td>{order.name}</td>
                                    <td>{order.qty}</td>
                                    <td>{order.price.toFixed(2)}</td>
                                    <td>{totalValue.toFixed(2)}</td>
                                    <td>{orderDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const SellOrderTable = ({ orders, title, typeClass }) => (
        <div className={`order-section ${typeClass}`}>
            <h2>{title} ({orders.length})</h2>
            <div className="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>Instrument</th>
                            <th>Qty.</th>
                            <th>Buy Price</th>
                            <th>Sell Price</th>
                            <th>Total Value</th>
                            <th>Order Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => {
                            const totalValue = order.qty * order.CurrentPrice;
                            const orderDate = new Date(order.createdAt).toLocaleDateString();

                            return (
                                <tr key={order._id || index}>
                                    <td>{order.name}</td>
                                    <td>{order.qty}</td>
                                    <td>{order.price.toFixed(2)}</td>
                                    <td>{order.CurrentPrice.toFixed(2)}</td>
                                    <td>{totalValue.toFixed(2)}</td>
                                    <td>{orderDate}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="container Holding">
            <h2>Order History</h2>
            <hr />

            <OrderTable
                orders={buyOrders}
                title="Buy Orders"
                typeClass="buy-table"
            />

            <br />

            <SellOrderTable
                orders={sellOrders}
                title="Sell Orders"
                typeClass="sell-table"
            />
        </div>
    );
}
