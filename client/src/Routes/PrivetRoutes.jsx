import { Navigate, useLocation } from "react-router";
import useAuth from "../Providers/useAuth";

const PrivetRoutes = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();

    if (loading) return <span className="loading loading-spinner loading-lg"></span>;

    if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    
    return  children
};

export default PrivetRoutes;