import React, {useState, createContext} from "react";

export const AppContext = createContext();

export const AppContextProvider = ({children}) => {
    const [cartOpen, setCartOpen] = useState(false)
    const [user, setUser] = useState(null)

    return(
        <AppContext.Provider value={{cartOpen, setCartOpen, user, setUser}}>
            {children}
        </AppContext.Provider>
    )
}