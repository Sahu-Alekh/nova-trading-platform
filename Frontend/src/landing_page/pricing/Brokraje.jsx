import "./PricingPage.css";

export default function Brokraje() {
    return (
        <div className="container p-5">
            <div className="row p-5">
                <h4 className="pb-5">Charges explained</h4>
                <div className="col-6 lh-lg ">
                    <p>Securities/Commodities transaction tax</p>
                    <p className="textSmall">Tax by the government when transacting on the exchanges. Charged as above on both buy and sell sides when trading equity delivery. Charged only on selling side when trading intraday or on F&O.</p>
                    <p className="textSmall">When trading at Zerodha, STT/CTT can be a lot more than the brokerage we charge. Important to keep a tab.</p>
                    <p>Transaction/Turnover Charges</p>
                    <p className="textSmall">Charged by exchanges (NSE, BSE, MCX) on the value of your transactions.</p>
                    <p className="textSmall">BSE has revised transaction charges in XC, XD, XT, Z and ZP groups to ₹10,000 per crore w.e.f 01.01.2016. (XC and XD groups have been merged into a new group X w.e.f 01.12.2017)</p>
                    <p className="textSmall">BSE has revised transaction charges in SS and ST groups to ₹1,00,000 per crore of gross turnover.</p>
                    <p className="textSmall">BSE has revised transaction charges for group A, B and other non exclusive scrips (non-exclusive scrips from group E, F, FC, G, GC, W, T) at ₹375 per crore of turnover on flat rate basis w.e.f. December 1, 2022.</p>
                    <p className="textSmall">BSE has revised transaction charges in M, MT, TS and MS groups to ₹275 per crore of gross turnover.</p>
                    <p>Call & trade</p>
                    <p className="textSmall">Additional charges of ₹50 per order for orders placed through a dealer at Zerodha including auto square off orders.</p>
                    <p>Stamp charges</p>
                    <p className="textSmall">Stamp charges by the Government of India as per the Indian Stamp Act of 1899 for transacting in instruments on the stock exchanges and depositories.</p>
                    <p>Account with debit balance</p>
                    <p className="textSmall">If the account is in debit balance, any order placed will be charged ₹40 per executed order instead of ₹20 per executed order.</p>
                </div>
                <div className="col-6 lh-lg">
                    <p>GST</p>
                    <p className="textSmall">Tax levied by the government on the services rendered. 18% of ( brokerage + SEBI charges + transaction charges)</p>
                    <p>SEBI Charges</p>
                    <p className="textSmall">Charged at ₹10 per crore + GST by Securities and Exchange Board of India for regulating the markets.</p>
                    <p>DP (Depository participant) charges</p>
                    <p className="textSmall">₹15.34 per scrip (₹3.5 CDSL fee + ₹9.5 Zerodha fee + ₹2.34 GST) is charged on the trading account ledger when stocks are sold, irrespective of quantity.</p>
                    <p className="textSmall">Female demat account holders (as first holder) will enjoy a discount of ₹0.25 per transaction on the CDSL fee.</p>
                    <p className="textSmall">Debit transactions of mutual funds & bonds get an additional discount of ₹0.25 on the CDSL fee.</p>
                    <p>Pledging charges</p>
                    <p className="textSmall">₹30 + GST per pledge request per ISIN.</p>
                    <p>AMC (Account maintenance charges)</p>
                    <p className="textSmall">For BSDA demat account: Zero charges if the holding value is less than ₹4,00,000. To learn more about BSDA, Click here</p>
                    <p className="textSmall">For non-BSDA demat accounts: ₹300/year + 18% GST charged quarterly (90 days). To learn more about AMC, Click here</p>
                    <p>Corporate action order charges</p>
                    <p className="textSmall">₹20 plus GST will be charged for OFS / buyback / takeover / delisting orders placed through Console.</p>
                    <p>Off-market transfer charges</p>
                    <p className="textSmall">₹25 per transaction.</p>
                    <p>Physical CMR request</p>
                    <p className="textSmall">First CMR request is free. ₹20 + ₹100 (courier charge) + 18% GST for subsequent requests.</p>
                </div>
                <p className="pt-5">Disclaimer</p>
                <p className="textSmall lh-lg">For Delivery based trades, a minimum of ₹0.01 will be charged per contract note. Clients who opt to receive physical contract notes will be charged ₹20 per contract note plus courier charges. Brokerage will not exceed the rates specified by SEBI and the exchanges. All statutory and regulatory charges will be levied at actuals. Brokerage is also charged on expired, exercised, and assigned options contracts. Free investments are available only for our retail individual clients. Companies, Partnerships, Trusts, and HUFs need to pay 0.1% or ₹20 (whichever is less) as delivery brokerage. A brokerage of 0.25% of the contract value will be charged for contracts where physical delivery happens. For netted off positions in physically settled contracts, a brokerage of 0.1% will be charged.</p>
            </div>
        </div>
    );
}