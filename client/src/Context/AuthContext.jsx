import { useState, createContext, useContext} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [session, setSession] = useState(null);

    const signIn = (email,  password)=>{

    }

    const signOut = ()=>{
        setSession(null);
    }

    return (
        <AuthContext value={{session, setSession, signOut}}>
            {children}
        </AuthContext>
    )
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}