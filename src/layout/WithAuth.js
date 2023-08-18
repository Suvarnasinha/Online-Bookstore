// import Cookies from "js-cookie";
// import React, { useEffect } from "react";
// import { Navigate, useNavigate } from "react-router-dom";

// export const WithAuth = (Component) => {
//     const Authentication = () => {
//         const email = Cookies.get("auth_email");
//         const navigate = useNavigate();
//         useEffect(() =>{
//         if(!email) {
//             navigate("/");
//         }       
//             },[email]);
//             return email ? <Component /> : null;
//         };
//         return Authentication;
// };

// export default WithAuth;
import Cookies from "js-cookie";
import React, { useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";

const WithAuth = (Component) => {
  const Authentication = () => {
    const email = Cookies.get("auth_email");
    const navigate = useNavigate();
    useEffect(() => {
      if (!email) {
        navigate("/");
      }
    }, [email])
    return email ? <Component /> : null;
  };
  return Authentication;
};

export default WithAuth;
export const useAuthContext = () => {
  return useContext(WithAuth);
};