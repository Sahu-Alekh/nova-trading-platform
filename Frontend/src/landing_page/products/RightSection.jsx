import "./ProductPage.css";

export default function RightSection({imageUrl, ProductName, ProductDescription, LearnMore}) {
    return (
        <div className="container Right-Col">
            <div className="row ">
                <div className="col-5 RigthtText">
                    <h2 className="mb-4 text-muted" style={{fontSize:"24px"}}>{ProductName}</h2>
                    <p className="text-muted lh-lg">{ProductDescription}</p>
                    <div className="mb-4">
                        <a className="Demo" href={LearnMore}>{LearnMore} <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
                <div className="col-7 ">
                    <img src={imageUrl} alt="" />
                </div>
            </div>
        </div>
    )
}