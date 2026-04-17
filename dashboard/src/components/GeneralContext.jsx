import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid,username ,Price) => { },
  closeBuyWindow: () => { },
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedUsername, setSelectedUsername] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);

  const handleOpenBuyWindow = (uid, username, Price) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(uid);
    setSelectedUsername(username);
    setSelectedPrice(Price);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setSelectedUsername("");
    setSelectedPrice(0);
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        selectedUsername: selectedUsername,
        selectedPrice: selectedPrice,
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} username={selectedUsername} Price={selectedPrice} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;