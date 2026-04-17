import "./ProductPage.css";

export default function LeftSection({ imageUrl, ProductName, ProductDescription, TryDemo, Learnmore, googlePlay, AppStore }) {
    return (
        <div className="container  p-5">
            <div className="row ">
                <div className="col-1"></div>
                <div className="col-7 p-5">
                    <img src={imageUrl} alt="" />
                </div>
                
                <div className="col-4 mt-5 p-5">
                    <h2 className="mb-4 text-muted" style={{fontSize:"24px"}}>{ProductName}</h2>
                    <p className="text-muted lh-lg">{ProductDescription}</p>
                    <div className="mb-4">
                        <a className="Demo" href={TryDemo}>Try Demo <i className="fa-solid fa-arrow-right"></i></a>
                        <a href={Learnmore}>Learn More <i className="fa-solid fa-arrow-right"></i></a>
                    </div>
                    <div className="">
                        <a className="Play" href={googlePlay}><img src="\images\googlePlayBadge.svg" alt="" /></a>
                        <a href={AppStore}><img src="\images\appstoreBadge.svg" alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}