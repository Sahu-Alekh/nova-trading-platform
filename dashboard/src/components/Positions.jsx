import { useState, useEffect, use } from "react";
import axios from "axios";
import "./Components.css"

// import { positions } from "../Data/data";

export default function Positions({ username }) {
    const [allPositions, setAllPositions] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3003/allPosition/?username=${ username }`)
            .then((res) => {
                setAllPositions(res.data);
            })
    }, [])

    const Position = allPositions.filter(position => Number(position.pnl) <= -50);
    return (
        <div className="container Position">
            <h2>Positions ({Position.length })</h2>
            <div className="order-table">
                <table>
                    <tr>
                        <th>Instrument</th>
                        <th>Qty.</th>
                        <th>Avg.Cost</th>
                        <th>Curr.Val</th>
                        <th>LTP</th>
                        <th>P&L</th>
                        <th>Chg</th>
                    </tr>

                    {Position.map((stock, index) => {
                        const currVal = stock.CurrVal * stock.qty;

                        return (
                            <tr key={index}>
                                <td>{stock.instrument}</td>
                                <td>{stock.qty}</td>
                                <td>{stock.avg}</td>
                                <td>{stock.ltp}</td>
                                <td className="loss">{currVal.toFixed(2)}</td>
                                <td className="loss">{stock.pnl}</td>
                                <td className="loss">{stock.dayChgPercent}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
}