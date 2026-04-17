import "./PricingPage.css";

export default function Hero() {
    return (
        <div className="container pt-4 ">
            <div className="text-center mt-5 pb-5">
                <h1 className="fs-3 lh-lg">Charges</h1>
                <p className="fs-5 text-muted">List of all charges and taxes</p>
            </div>

            <div className="row text-center p-5">
                <div className="col-4 p-5">
                    <img className="heroImg" src="\images\pricing-eq.svg" alt="" />
                    <h1 className="fs-2  lh-lg ">Free equity delivery</h1>
                    <p className=" lh-lg text-muted ">All equity delivery investments (NSE, BSE), are absolutely free — ₹ 0 brokerage.</p>
                </div>
                <div className="col-4 p-5">
                    <img className="heroImg" src="\images\other-trades.svg" alt="" />
                    <h1 className="fs-3 lh-lg ">Intraday and F&O trades</h1>
                    <p className="lh-lg text-muted ">Flat ₹ 20 or 0.03% (whichever is lower) per executed order on intraday trades across equity, currency, and commodity trades. Flat ₹20 on all option trades.</p>
                </div>
                <div className="col-4 p-5">
                    <img className="heroImg" src="\images\pricing-eq.svg" alt="" />
                    <h1 className="fs-3 lh-lg ">Free direct MF</h1>
                    <p className="lh-lg text-muted ">All direct mutual fund investments are absolutely free — ₹ 0 commissions & DP charges.</p>
                </div>
            </div>
        </div>
    );
}