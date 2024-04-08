import React, {useContext, createContext, useState} from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const handleChange = (e) => {
        setUser(e.target.value);
    }

    return (
        <UserContext.Provider value={{user, setUser, handleChange}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {  
    return useContext(UserContext);
}

