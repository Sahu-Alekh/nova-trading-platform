export default function Awards() {
    return (
        <div className="container mt-5 mb-5">
            <div className="row">
                <div className="col-6 p-5">
                    <img src="/images/largestBroker.svg" alt="" />
                </div>
                <div className="col-6 p-5 mt-3">
                    <h2>Largest stock broker in India</h2>
                    <p className="mb-5">2+ million Nova users Contributed to over 15% of all retail order volumes in india daily by trading and investment </p>
                    <div className="row">
                        <div className="col-6">
                            <ul>
                                <li>
                                    <p>Futures and Options</p>
                                </li>
                                <li>
                                    <p>Commodity derivatives</p>
                                </li>
                                <li>
                                    <p>Currency derivatives</p>
                                </li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <ul>
                                <li>
                                    <p>Stock & IPOs</p>
                                </li>
                                <li>
                                    <p>Direct mutual funds</p>
                                </li>
                                <li>
                                    <p>Bonds and Govt. Securities</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img src="..\public\images\pressLogos.png" alt="" style={{width:"90%"}} />
                </div>
            </div>
        </div>
    );
}