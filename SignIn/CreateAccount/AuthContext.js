import React, {useState, useEffect, createContext, useContext} from 'react';
import {onAuthStateChanged} from "firebase/auth";
import {FIREBASE_AUTH} from "../../FireBaseConfig";

const AuthContext = createContext(null);
const auth = FIREBASE_AUTH;

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
const [authUser, setAuthUser] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        return onAuthStateChanged(auth, (user) => {
            if(user) {
                setAuthUser(user);
                setIsLoggedIn(true);
            }
            else {
                setAuthUser(null);
                setIsLoggedIn(false);
            }
        });
    }, []);

const value =
    {   authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn};

return (
    <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>
);
}