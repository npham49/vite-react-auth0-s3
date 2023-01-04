import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children,role }:{ children: JSX.Element,role:string }) => {
  const { isAuthenticated, user, getIdTokenClaims} = useAuth0()
  useEffect(()=> {
    async function checkRole() {
      const token = await getIdTokenClaims()
      // console.log(token?.[window.location.origin + '/roles'])
      // console.log(window.location.origin)
    }
    checkRole()
  },[])
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;