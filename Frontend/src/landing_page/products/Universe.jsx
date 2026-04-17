import "./ProductPage.css";

export default function Universe() {
    return (
        <div className="contener universeBg">
            <div className="row p-5">
                <h1 className="text-center fs-4 text-muted">The Nova Universe</h1>
                <p className="text-center mt-3">Extend your trading and investment experience even further with our partner platforms</p>
                <div className="col-4 fs-6 p-3 universLogo">
                    <img src="\images\zerodhaFundhouse.png" alt="" />
                    <p className="text-center mt-3">Our asset management venture <br /> that is creating simple and transparent index <br /> funds to help you save for your goals.</p>
                </div>
                <div className="col-4 p-3 universLogo">
                    <img src="\images\sensibullLogo.svg" alt="" />
                    <p className="text-center mt-3">Options trading platform that lets you create strategies, <br /> analyze positions, and examine data points like open interest, FII/DII, and more.</p>
                </div>
                <div className="col-4 p-3 universLogo">
                    <img src="\images\goldenpiLogo.png" alt="" />
                    <p className="text-center mt-3">Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.</p>
                </div>
                <div className="col-4 p-3 universLogo">
                    <img src="\images\streakLogo.png" alt="" />
                    <p className="text-center mt-3">Systematic trading platform that allows you to create and backtest strategies without coding.</p>
                </div>
                <div className="col-4 p-3 universLogo">
                    <img src="\images\smallcaseLogo.png" alt="" />
                    <p className="text-center mt-3">Thematic investing platform that helps you invest in diversified baskets of stocks on ETFs.</p>
                </div>
                <div className="col-4 p-3 universLogo">
                    <img src="\images\dittoLogo.png" alt="" />
                    <p className="text-center mt-3">Personalized advice on life and health insurance. No spam and no mis-selling.</p>
                </div>
            </div>
        </div>
    )
}