export default function Education() {
    return (
        <div className="container mt-5">
            <div className="row mt-5">
                <div className="col-6 mt-5">
                    <img src="/images/education.svg" alt="" />
                </div>
                <div className="col-6 mt-5 p-5">
                    <h1 className="mb-4" style={{fontSize:"27px"}}>Free and open market education</h1>
                    <p>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                    <a href="">Varsity <i class="fa-solid fa-arrow-right"></i></a>
                    <p className="mt-5">TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                    <a href="">TradingQ&A <i class="fa-solid fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    );
}