import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const {  isAuthenticated } = useSelector((state) => state.login);
 // const Navigate = useNavigate();
  if(isAuthenticated === false){
               return <Navigate to="/login" />;
            }
            return children;
  // return (
  //   <Fragment>
  //     {loading === false && (
  //       if(isAuthenticated === false){
  //          return Navigate('/login');
  //       }
        
  //     )}
  //   </Fragment>
  //  )
};

export default ProtectedRoute;

// <Route
        //   {...rest}
        //   render={(props) => {
        //     if (isAuthenticated === false) {
        //       return <Navigate to="/login" />;
        //     }

        //     if (isAdmin === true && user.role !== "admin") {
        //       return <Navigate to="/login" />;
        //     }

        //     return <Component {...props} />;
        //   }}
        // />