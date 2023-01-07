import { useContext } from "react";
import { Navigate , Outlet } from "react-router-dom";
import { AuthGoogleContext } from "../Contexts/authGoogle";

export const PrivateRoutes = () =>  {
    const { signed } = useContext(AuthGoogleContext);
    return signed ? <Outlet /> : <Navigate to="/"/>;
}