import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tooltip, Grow } from "@mui/material";

import "./Components.css";
import { WatchListItem } from "./WatchListItem";
import { DoughnutChart } from "./DoughnutChart";

const WATCHLIST = [
    'AAPL', 'MSFT', 'TSLA', 'GOOGL', 'AMZN',
    'META', 'NVDA', 'NFLX', 'DIS', 'BABA',
    'JPM', 'V', 'WMT', 'JNJ', 'PG',
    'XOM', 'BAC', 'MA', 'HD', 'CVX'
];

export default function Watchlist({ username }) {
    const [prices, setPrices] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchBatchPrices = async () => {
            try {
                const symbolsParam = WATCHLIST.join(',');
                const url = `https://nova-backend-gvud.onrender.com/watchlist?symbols=${symbolsParam}`;
                const response = await axios.get(url);
                setPrices(response.data);
            } catch (err) {
                setError("Error loading dashboard.");
            } finally {
                setLoading(false);
            }
        };
        fetchBatchPrices();
    }, []);

    // --- NEW LOGIC START ---
    const handleSearchClick = async () => {
        if (!searchQuery.trim()) return;

        try {
            // Making API call for the specific search input
            const url = `https://nova-backend-gvud.onrender.com/watchlist?symbols=${searchQuery.toUpperCase()}`;
            const response = await axios.get(url);

            // Update the prices state with the new data
            // This merges the new search result into your existing list
            setPrices(prevPrices => ({
                ...prevPrices,
                ...response.data
            }));
            
            // Optional: Clear search after success
            // setSearchQuery(""); 
        } catch (err) {
            console.error("Search failed:", err);
            alert("Symbol not found or API error.");
        }
    };
    // --- NEW LOGIC END ---

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Market Data...</div>;
    if (error) return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;

    const stockList = Object.entries(prices).map(([symbolName, stockPrice]) => ({
        name: symbolName,
        price: stockPrice.c,
        d: stockPrice.d,
        dp: stockPrice.dp
    }));

    // Logic to filter the view based on what's in the search box
    const filteredStockList = stockList.filter((stock) =>
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const labels = filteredStockList.map((stock) => stock.name);
    const chartPrices = filteredStockList.map((stock) => stock.price);

    const data = {
        labels,
        datasets: [
            {
                label: "Price",
                data: chartPrices,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.58)', 'rgba(54, 162, 235, 0.58)', 'rgba(255, 206, 86, 0.58)',
                    'rgba(75, 192, 192, 0.58)', 'rgba(153, 102, 255, 0.58)', 'rgba(255, 159, 64, 0.58)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="watchlist-contaniner">
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search eg: AAPL, TSLA..."
                    className="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    // Trigger search on "Enter" key too
                    onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
                />
                <button className="search-btn" onClick={handleSearchClick}>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
                <span className="counts"> {filteredStockList.length}/50</span>
            </div>

            <ul className="list p-0">
                {filteredStockList.map((stock, index) => (
                    <WatchListItem stock={stock} key={index} username={username} />
                ))}
            </ul>

            <DoughnutChart data={data} />
        </div>
    );
}
