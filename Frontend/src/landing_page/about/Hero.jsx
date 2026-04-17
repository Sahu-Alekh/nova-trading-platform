import './AboutPage.css';

export default function Hero() {
    return (
        <div className="container">
            <h1 className="AboutH1 fs-4 text-center">We pioneered the discount broking model in India. <br /> Now, we are breaking ground with our technology.</h1>
            <div className="row AboutHeroRow">
                <div className="col-6">
                    <p className='lh-lg'>We kick-started operations on the 15th of August, 2010 <br /> with the goal of breaking all barriers that traders and <br /> investors   face in India in terms of cost, support, and technology. <br /> </p>
                    <p>We named the company Zerodha, a combination of Zero <br /> and "Rodha", the Sanskrit word for barrier.</p>
                    <p className='lh-lg'>Today, our disruptive pricing models and in-house technology <br /> have made us the biggest stock broker in India.</p>
                    <p className='lh-lg'>Over 1.6+ crore clients place billions of orders every year through our powerful ecosystem of investment <br /> platforms, contributing over 15% of all Indian <br /> retail trading volumes.</p>
                </div>
                <div className="col-6">
                    <p className='lh-lg'>In addition, we run a number of popular open online educational and community initiatives to empower retail traders and investors.</p>
                    <p className='lh-lg'>Rainmatter, our fintech fund and incubator, has invested in several fintech startups with the goal of growing the Indian capital markets.</p>
                    <p className='lh-lg'>And yet, we are always up to something new every day. Catch up on the latest updates on our blog or see what the media is saying about us or learn more about our business and product philosophies.</p>
                </div>
            </div>
        </div>
    );
}