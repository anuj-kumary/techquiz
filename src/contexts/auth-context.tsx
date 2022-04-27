import React, { createContext, useContext, useState } from "react";


type userType = {
    email: string;
    name: string;
    id: string;
    authProvider: string;
} | null;

type AuthContextType = {
    authToken: string;
    setAuthToken: (arg0: string) => void;
    authUser: userType;
    setAuthUser: (arg0: userType) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const localStorageAuth = localStorage.getItem("token")
    const localStorageUser = localStorage.getItem("user")
    const [authToken, setAuthToken] = useState<string>(
        localStorageAuth ? localStorageAuth : ''
    );
    const [authUser, setAuthUser] = useState(
        localStorageUser ? JSON.parse(localStorageUser) : null
    );
    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }