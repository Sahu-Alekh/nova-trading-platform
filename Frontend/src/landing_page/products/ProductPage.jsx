import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import RightSection2 from "./RightSection2";
import Universe from "./Universe";

import "./ProductPage.css";

export default function ProductPage() {
    return (
        <>
            <Hero />
            <LeftSection imageUrl="/images/kite.png" ProductName="Kite" ProductDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices." TryDemo="" Learnmore="" googlePlay="" AppStore=""/>
            <RightSection imageUrl="/images/console.png" ProductName="Console" ProductDescription="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations." LearnMore="Learn More" />
            <LeftSection imageUrl="/images/varsity.png" ProductName="Varsity mobile" ProductDescription="An easy to grasp, collection of stock market lessons with in-depth coverage and illustrations. Content is broken down into bite-size cards to help you learn on the go." TryDemo="" Learnmore="" googlePlay="" AppStore=""/>
            <RightSection2 imageUrl="/images/kiteconnect.png" ProductName="Kite Connect API" ProductDescription="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase." LearnMore="Kite Connect"/>
            <LeftSection imageUrl="/images/coin.png" ProductName="Coin" ProductDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices." TryDemo="" Learnmore="" googlePlay="" AppStore=""/>
            <Universe />
        </>
    )
}