import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext"

const ProtectedRoute = ({children}) => {
  const {checkToken} = useAuth();

  if (!checkToken()) {
   
    return <Navigate to={'/login'} />
    
  }
  else {
    return <>{children}</>
  }
}

export default ProtectedRoute;