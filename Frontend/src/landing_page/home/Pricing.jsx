export default function Pricing() {
    return (
        <div className="container">
            <div className="row p-5">
                <div className="col-6 p-5">
                    <h1 className="fs-3 mb-3">Unbeatable Pricing</h1>
                    <p className="text-muted">We pioneered the concept of discount broking and price <br /> transparency in India. Flat fees and no hidden charges.</p>
                    <a href="" style={{ textDecoration: "none" }}>See pricing<i class="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className="col-6 p-5">
                    <div className="row">
                        <div className="col-4">
                            <img style={{width:"72%"}} src="/images/pricing-eq.svg" alt="" />
                            <p style={{fontSize:"10px"}}> Free account opening</p>
                        </div>
                        <div className="col-4">
                            <img style={{width:"72%"}} src="/images/pricing-eq.svg" alt="" />
                            <p style={{fontSize:"10px"}}> Free equity delivery and direct mutual funds</p>
                        </div>
                        <div className="col-4">
                            <img  style={{width:"75%"}} src="/images/other-trades.svg" alt="" />
                            <p style={{fontSize:"10px"}}> Intraday andF&O</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}