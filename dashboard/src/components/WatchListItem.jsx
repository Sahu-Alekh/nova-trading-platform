import { useState, useContext } from "react";
import axios from "axios";
import "./Components.css";
import { Tooltip, Grow, stepConnectorClasses } from "@mui/material";
import { MoreHoriz, BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import GeneralContext from "./GeneralContext";

export const WatchListItem = ({ stock, username }) => {
    const [showWatchlistAction, setShowWatchlistAction] = useState(false);

    const handleMouseEnter = () => setShowWatchlistAction(true);
    const handleMouseExit = () => setShowWatchlistAction(false);

    // --- THE BULLETPROOF FIX ---
    // We force the incoming data to be a Number. If it's missing (undefined), it defaults to 0.
    const safePrice = Number(stock.price) || 0;
    const safeChange = Number(stock.d) || 0;
    const safePercent = Number(stock.dp) || 0;

    // Calculate if it's down based on our safe numbers
    const isDown = safeChange < 0;

    return (
        <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseExit}>
            <div className="item">
                <p className={isDown ? "down" : "up"}>{stock.name}</p>

                <div className="itemInfo">
                    <span className={isDown ? "percent down" : "percent up"}>
                        {safeChange > 0 ? "+" : ""}
                        {safeChange.toFixed(2)} ({safePercent.toFixed(2)}%)
                    </span>

                    {isDown ? (
                        <KeyboardArrowDown className="down" />
                    ) : (
                        <KeyboardArrowUp className="up" />
                    )}

                    <span className="price">${safePrice.toFixed(2)}</span>
                </div>
            </div>

            {showWatchlistAction && <WatchListItemActions uid={stock.name} username={username} Price={safePrice} />}
        </li>
    );
}

export const WatchListItemActions = ({ uid, username, Price }) => {
    const generalContext = useContext(GeneralContext);
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);

    const handleBuyClick = () => {
        generalContext.openBuyWindow(uid, username, Price);
    };

    const handleSellConfirm = async () => {
        try {
            const response = await axios.post("http://localhost:3003/sellOrder", {
                username: username,
                name: uid,
                price: Price
            });
            alert(response.data.message);
            setIsSellModalOpen(false);
            // Optional: window.location.reload() to refresh dashboard data
        } catch (err) {
            alert(err.response?.data?.message || "Error selling stock");
            setIsSellModalOpen(false);
        }
    };

    return (
        <span className="actions">
            <span>
                <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow} onClick={handleBuyClick}>
                    <button className="buy">Buy</button>
                </Tooltip>
                <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
                    <button className="sell" onClick={() => setIsSellModalOpen(true)}>Sell</button>
                </Tooltip>

                {/* --- Sell Confirmation Modal --- */}
                {isSellModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <h3>Confirm Sale</h3>
                            <p>Are you sure you want to sell <strong>{uid}</strong>?</p>
                            <p style={{ fontSize: "12px", color: "gray" }}>This will remove the stock from your orders and update your funds.</p>
                            <div className="modal-actions">
                                <button className="btn btn-blue" style={{ backgroundColor: "#df514c" }} onClick={handleSellConfirm}>Confirm Sell</button>
                                <button className="btn btn-white" onClick={() => setIsSellModalOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
                    <button className="action">
                        <BarChartOutlined className="analytics" />
                    </button>
                </Tooltip>
                <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
                    <button className="action">
                        <MoreHoriz className="more" />
                    </button>
                </Tooltip>
            </span>
        </span>
    );
}