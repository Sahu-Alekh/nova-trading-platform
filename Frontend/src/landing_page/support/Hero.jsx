import "./Support.css";

export  default function Hero() {
    return (
        <div className="SupportHome">
            <div className="supportCom">
                <h2>Support Portal</h2>
                <button className="btn btn-primary">My tickets</button>
            </div>
            <div className="input">
                <i class="fa-brands fa-sistrix"></i>
                <input type="text" placeholder="Eg: How to open a Nova Accout"/>
            </div>
        </div>
    );
}

