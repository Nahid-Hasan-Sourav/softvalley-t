import React, { createContext, useState } from 'react';
export const AuthContext=createContext()
const AuthProvider = ({children}) => {
    const[user,setUser]=useState();
    const [loading,setLoading]=useState(true);

    const Info={
        user,
        setUser,
        loading,
        setLoading
    }
    return (
        <AuthContext.Provider value={Info}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;