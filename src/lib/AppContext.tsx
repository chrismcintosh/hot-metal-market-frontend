import React, {useState, createContext} from "react";


interface AppContextInterface {
    cartOpen: boolean,
    setCartOpen: Function,
    user: object,
    setUser: Function
}

export const AppContext = createContext<AppContextInterface | null>(null);

export const AppContextProvider = ({children}) => {
    const [cartOpen, setCartOpen] = useState<boolean>(false)
    const [user, setUser] = useState(null)

    return(
        <AppContext.Provider value={{cartOpen, setCartOpen, user, setUser}}>
            {children}
        </AppContext.Provider>
    )
}