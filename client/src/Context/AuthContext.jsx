import { useState, createContext, useContext} from "react";
import { useEffect } from "react";
import axios from '../axiosConfig';

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const signIn = (email,  password)=>{

    }

    const signOut = async ()=>{
        await axios.post('/logout');
        setSession(null);
    }

    useEffect(()=>{
        const checkSession = async () =>{
            try {
                const response = await axios.get('/session');
                setSession({
                    username: response.data.username
                })

            } catch {
                setSession(null)
            } finally {
                setLoading(false);
            }
        }
        checkSession();
    } , [])

    return (
        <AuthContext value={{session, loading, setSession, signOut}}>
            {children}
        </AuthContext>
    )
}

export const useAuth = ()=>{
    return useContext(AuthContext);
}