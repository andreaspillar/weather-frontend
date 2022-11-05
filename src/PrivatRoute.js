import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";

export function authenticated() {
    let token = localStorage.getItem('X-Access-Token')
    if (token) {
        let tokenExpiration = jwtDecode(token).exp
        return tokenExpiration*1000 > Date.now() && token
    }
}

export const PrivatRoutes = ({children}) => {
    return authenticated() ? children : <Navigate to='/' replace />
}