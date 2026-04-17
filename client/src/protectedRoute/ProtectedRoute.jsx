import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";


const ProtectedRoute =()=>{
    const {session , loading} = useAuth();

    if (loading) return <div></div>

    if (!session) return <Navigate to='/login' />;

    return <Outlet />
}

export default ProtectedRoute;