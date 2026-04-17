import "./ProductPage.css";

export default function Hero() {
    return (
        <div className="container pt-4 pb-5 Hero-Border">
            <div className="text-center mt-5 pb-5">
                <h1 className="fs-3 lh-lg">Nova Products</h1>
                <p className="fs-5 text-muted">Sleek, modern, and intuitive trading platforms</p>
                <p className="pb-1 text-muted">
                    Check out our <a href="" style={{ textDecoration: "none" }}>
                        investment offerings <i className="fa-solid fa-arrow-right"></i>
                    </a>
                </p>
            </div>
        </div>
    );
}