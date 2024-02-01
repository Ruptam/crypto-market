import { useState } from "react";
import CurrencyContext from "./CurrencyContext";



const CurrencyContextProvider = ({children}) => {

    const [currency, setCurrency] = useState('INR');

    return(
        <CurrencyContext.Provider value={{currency, setCurrency}}>
            {children}
        </CurrencyContext.Provider>
    )
}

export default CurrencyContextProvider;