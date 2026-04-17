import Hero from './Hero';
import Awards from './Awards';
import Stars from './Stars';
import Pricing from './Pricing';
import Education from './Education';

import './HomePage.css';

import OpenAccounts from '../OpenAccount';


export default function HomePage() {
    return (
        <>
            <Hero />
            <Awards />
            <Stars />
            <Pricing />
            <Education />
            <OpenAccounts />
        </>
    );
}