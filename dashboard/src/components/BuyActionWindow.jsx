import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, username, Price }) => {
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(Price); // Initialize with Price from props

    
    // Access context correctly
    const { closeBuyWindow } = useContext(GeneralContext);

    const handleBuyClick = async () => {
        try {
            const response = await axios.post(`http://localhost:3003/newOrder/?username=${username}`, {
                name: uid,
                qty: Number(stockQuantity),
                price: Number(stockPrice),
                mode: "BUY"
            });
            
            alert(response.data.message);
            closeBuyWindow(); // Use the function from context
        } catch (err) {
            alert(err.response?.data?.message || "Error placing order");
        }
    };

    const handleCancelClick = () => {
        closeBuyWindow();
    };

    return (
        <>
            <div className="modal-overlay" onClick={handleCancelClick}></div>
            <div className="container" id="buy-window">
                <div className="regular-order">
                    <div className="inputs">
                        <fieldset>
                            <legend>Qty.</legend>
                            <input
                                type="number"
                                onChange={(e) => setStockQuantity(e.target.value)}
                                value={stockQuantity}
                            />
                        </fieldset>
                        <fieldset>
                            <legend>Price</legend>
                            <input
                                type="number"
                                step="0.05"
                                value={stockPrice}
                            />
                        </fieldset>
                    </div>
                </div>

                <div className="buttons">
                    <span>Margin required ₹{(stockQuantity * stockPrice).toFixed(2)}</span>
                    <div>
                        <button className="btn btn-blue" onClick={handleBuyClick}>
                            Buy
                        </button>
                        <button className="btn btn-grey" onClick={handleCancelClick}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BuyActionWindow;