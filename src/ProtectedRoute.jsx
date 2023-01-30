import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = () => {
    return (
        localStorage.getItem('user') === null ? <Navigate to="/signin" /> : <Outlet />
    )
}

export default ProtectedRoute;