import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Components.css";

export default function Summary({ username }) {

    const [fundData, setFundData] = useState({
        availableMargin: 0,
        usedMargin: 0,
    });


    useEffect(() => {
        const fetchFunds = async () => {
            try {
                const response = await axios.get(`https://nova-backend-gvud.onrender.com/userFunds?username=${username}`);
                setFundData(response.data);
            } catch (err) {
                console.error("Error fetching summary funds:", err);
            }
        };

        if (username) {
            fetchFunds();
        }
    }, [username]);

    const formatValue = (num) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(2) + "k";
        }
        return num.toFixed(2);
    };

    return (
        <div className="container Summary">
            <h2>Hi, {username} Welcome to your Dashboard!</h2>
            
            <div className="row summary-equity">
                <div className="d-flex cont">
                    <a href=""><i className="fa-solid fa-clock"></i></a>
                    <p>Equity</p>
                </div>
                <div className="col-4 mt-3 Summary-equity-amount">
                    <p className="fs-3 m-0">{formatValue(fundData.availableMargin)}</p>
                    <p className="fs-6">Margin Available</p>
                </div>
                <div className="col-8 mt-3 Summary-equity-amount">
                    <p className="fs-6 m-0">Margin Used {formatValue(fundData.usedMargin)}</p>
                    <p className="fs-6 m-0">Opening Balance {formatValue(fundData.availableMargin + fundData.usedMargin)}</p>
                </div>
            </div>

            <div className="row summary-equity">
                <div className="d-flex cont">
                    <a href=""><i className="fa-solid fa-briefcase"></i></a>
                    <p>Holdings (13)</p>
                </div>
                <div className="col-4 mt-3 Summary-equity-amount">
                    <p className="fs-3 m-0">{formatValue(fundData.usedMargin)}</p>
                    <p className="fs-6">Margin Available</p>
                </div>
                <div className="col-8 mt-3 Summary-equity-amount">
                    <p className="fs-6 m-0">Margin Used {formatValue(fundData.availableMargin)}</p>
                    <p className="fs-6 m-0">Opening Balance {formatValue(fundData.availableMargin + fundData.usedMargin)}</p>
                </div>
            </div>
        </div>
    );
}
