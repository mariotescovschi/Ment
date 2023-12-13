import React, {useState, useEffect, createContext, useContext} from 'react';
import {onAuthStateChanged, initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import {FIREBASE_APP, FIREBASE_AUTH, FIRESTORE_DB} from "../../FireBaseConfig";
import {doc, onSnapshot} from "firebase/firestore";
import {MetadataProvider, useContextMetadata} from "../../MetadataContext";
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Image} from "expo-image";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider(props) {

const [authUser, setAuthUser] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [loading, setLoading] = useState(false);
const db = FIRESTORE_DB;
const auth = FIREBASE_AUTH;
const storage = getStorage();

const {userName, setUserName, userPhoto, setUserPhoto} = useContextMetadata();

useEffect(() => {

        setLoading(true);
        return onAuthStateChanged(auth, (user) => {
            if(user && user.emailVerified) {
                setAuthUser(user);
                setIsLoggedIn(true);
                const unsub = onSnapshot(
                    doc(db, "users", user.uid),
                    { includeMetadataChanges: true },
                    (doc) => {
                         setUserName(doc.data().name + ' ' + doc.data().lastName);


                         Image.prefetch(user.photoURL);
                    });

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
        setIsLoggedIn,
    };

return (
    <AuthContext.Provider value={value}>
        {props.children}
    </AuthContext.Provider>
);
}