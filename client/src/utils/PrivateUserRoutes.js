import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function PrivateUserRoutes() {
    
const isAuth = Boolean(useSelector((state) => state.token));

return (       
    isAuth ? <Outlet/> : <Navigate to='/' />
    )
}

export default PrivateUserRoutes