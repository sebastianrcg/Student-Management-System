import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


const ProtectedRoute =()=>{
    const {session} = useAuth();

    if (!session) return <Navigate to='/login' />;

    return <Outlet />
}

export default ProtectedRoute;