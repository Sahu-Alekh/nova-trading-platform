import './AboutPage.css';

export default function Hero() {
    return (
        <div className="container">
            <h1 className="fs-4 text-center">People</h1>
            <div className="row AboutHeroRow">
                <div className="col-5">
                    <img className='AboutImg' src="/#" alt="" />
                    <p className='Name'>Sahu Alekhniranjan</p>
                    
                    <p className='FName'>Co-founder, CEO</p>
                </div>
                <div className="col-7 p-3">
                    <p className='lh-lg'>Alekh bootstrapped and founded Nova in 2010 to overcome the hurdles he faced during his decade long stint as a trader. Today, <br /> Nova has changed the landscape of the Indian broking industry. <br /> </p>
                    <p className='lh-lg'>He is a member of the SEBI Secondary Market Advisory Committee (SMAC) and the Market Data Advisory Committee (MDAC). <br /> </p>
                    <p className='lh-lg'>Playing basketball is his zen. <br /> </p>
                    <p className='lh-lg'>Connect on <a href="">Homepage / TradingQnA / Twitter</a></p>
                </div>
            </div>
        </div>
    );
}