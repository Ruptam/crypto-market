
import { useState } from "react";
import ThemeContext from "./ThemeContext";

const ThemeContextProvider = ({children}) => {

    const [darkTheme, setDarkTheme] = useState(false);

    return(
        <ThemeContext.Provider value={{darkTheme, setDarkTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider;