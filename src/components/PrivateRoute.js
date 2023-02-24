import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../context/User.context";

const PrivateRoute = () => {
    const navigate = useNavigate()
    const {user} = useContext(UserContext)

    const onclickNavigateLogin = () => {
        navigate("/login")
    }
    return(
        user ? <Outlet /> : <Navigate to="/login" replace={true}/>
    )
}

export default PrivateRoute