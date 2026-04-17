import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "./Components.css"
import { VerticalGraph } from "./VerticalGraph";

export default function Holding({ username }) {
    const [allHoldings, setAllHoldings] = useState([]);
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        axios.get(`https://nova-backend-gvud.onrender.com/allHolding?username=${username}`)
            .then((res) => {
                setAllHoldings(res.data);
            })
    }, []);

    const data = {
        labels: allHoldings.map(s => s.instrument),
        datasets: [
            {
                label: 'Current Value',
                data: allHoldings.map(s => parseFloat(s.CurrVal)),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    const totalInvestment = allHoldings.reduce((sum, stock) => sum + parseFloat(stock.avg) * stock.qty, 0).toFixed(2);
    const currentValue = allHoldings.reduce((sum, stock) => sum + parseFloat(stock.CurrVal), 0).toFixed(2);
    const totalPnL = (currentValue - totalInvestment).toFixed(2);

    return (
        <div className="container Holding">
            <h2>Holdings ({allHoldings.length})</h2>
            <div className="order-table">
                <table>
                    <thead>
                        <tr>
                            <th>Instrument</th>
                            <th>Qty.</th>
                            <th>Avg. Cost</th>
                            <th>LTP</th>
                            <th>Cur. Val</th>
                            <th>P&L</th>
                            <th>Net Chg %</th>
                            <th>Day Chg</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allHoldings.map((stock, index) => (
                            <tr key={index}>
                                <td>{stock.instrument}</td>
                                <td>{stock.qty}</td>
                                <td>${stock.avg}</td>
                                <td>${stock.ltp}</td>
                                <td className={stock.pnl >= 0 ? "profit" : "loss"}>
                                    ${stock.CurrVal}
                                </td>
                                <td className={stock.pnl >= 0 ? "profit" : "loss"}>
                                    ${stock.pnl}
                                </td>
                                {/* Net change: % gain/loss from avg cost to current LTP */}
                                <td className={stock.netChg >= 0 ? "profit" : "loss"}>
                                    {stock.netChange}%
                                </td>
                                {/* Day change: today's price movement from backend */}
                                <td className={parseFloat(stock.dayChg) >= 0 ? "profit" : "loss"}>
                                    {stock.dayChgPercent}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="row mt-4">
                <div className="col-4">
                    <p><strong>${totalInvestment}</strong></p>
                    <p>Total Investment</p>
                </div>
                <div className="col-4">
                    <p><strong>${currentValue}</strong></p>
                    <p>Current Value</p>
                </div>
                <div className="col-4">
                    <p className={`${parseFloat(totalPnL) >= 0 ? "profit" : "loss"}`}>
                        <strong>${totalPnL}</strong>
                    </p>
                    <p>Total P&L</p>
                </div>
            </div>
            <VerticalGraph data={data} />
        </div>
    );
}
