import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector , useDispatch} from "react-redux";
import{clearUser} from "./redux/userSlice"

const Protected = ({ children, allowedRoles }) => {
  const [isVerified, setIsVerified] = useState(null); // State for role verification
  const user = useSelector((state) => state.user.user); // Access user data from Redux
  const dispatch = useDispatch()
 console.log(user)
  useEffect(() => {
    if (user) {
      // Check if the user's role is in the allowed roles
      if (allowedRoles.includes(user.role)) {
        setIsVerified(true); // User has a valid role
        
      } else {
        setIsVerified(false); // Invalid role
      }
    } else {
      setIsVerified(false); // No user data found (not logged in)
    }
  }, [user, allowedRoles]);

  if (isVerified === null) {
    return <div>Loading...</div>; // Show loading while checking verification
  }

  if (isVerified === true) {
    return children; // Render the protected content if user is verified
  }

  // Redirect to unauthorized page if the user is not authorized
  return <Navigate to="/" replace />;
};

export default Protected;
