import React, {useState, createContext} from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const [cartOpen, setCartOpen] = useState(false)

    return(
        <AppContext.Provider value={{cartOpen, setCartOpen}}>
            {children}
        </AppContext.Provider>
    )
}