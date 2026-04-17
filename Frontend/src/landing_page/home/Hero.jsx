export default function Hero() {
    return (
        <div className="container p-5 mb-5">
            <div className="row text-center">
                <img src="/images/homeHero.png" alt="Hero Image" className="mb-5" />
                <h1 className="mt-3 fs-2 text-muted">Invest in everything</h1>
                <p className="fs-3 herop">Online platform to invest in stocks, derivatives, mutual funds, and more.</p>
                <button className="p-2 btn btn-primary fs-5 mb-5" style={{width:"20%", margin: "0 auto"}}>Signup Now</button>
            </div>
        </div>
    );
}