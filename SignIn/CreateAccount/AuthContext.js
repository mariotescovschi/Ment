import React, {useState, useEffect, createContext, useContext} from 'react';
import {onAuthStateChanged, initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {FIREBASE_APP, FIREBASE_AUTH} from "../../FireBaseConfig";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {
const [authUser, setAuthUser] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [loading, setLoading] = useState(false);
const auth = FIREBASE_AUTH;
    useEffect(() => {
        setLoading(true);
        return onAuthStateChanged(auth, (user) => {
            if(user && user.emailVerified) {
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