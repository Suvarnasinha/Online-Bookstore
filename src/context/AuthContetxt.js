import Cookies from "js-cookie";
import React, { useState } from "react";
import { createContext } from "react";

const initialUserValue = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    role: "",
    password: "",
};

const initialState = {
    setUser: () => {},
    userData: initialUserValue, // Change 'user' to 'userData' here
    signOut: () => {},
};

export const AuthContext = createContext(initialState);

const AuthWrapper = ({ children }) => {
    const [userData, setUserData] = useState(initialUserValue);

    const setUser = (data) => {
        console.log("datahere:", data);
        Cookies.set("userInfo", JSON.stringify(data));
        setUserData(data);
    };

    const signOut = () => {
        Cookies.remove("userInfo");
    };

    const value = {
        setUser,
        userData,
        signOut,
    };

    return (
        <AuthContext.Provider value={value}> {/* Use 'value' here */}
          {children}
        </AuthContext.Provider>
      );
};

export default AuthWrapper;
