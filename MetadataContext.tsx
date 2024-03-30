import React, {createContext, useContext, useEffect, useState} from 'react';
import * as SplashScreen from "expo-splash-screen";
import {doc, getDoc, onSnapshot} from "firebase/firestore";
import {Image} from "expo-image";
import {FIRESTORE_DB} from "./FireBaseConfig";
import {cacheObject, cacheString, getCachedObject, getCachedString} from "./CachingFunctions";

interface MetadataContextProps {
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;

    userPhoto: string;
    setUserPhoto: React.Dispatch<React.SetStateAction<string>>;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    currentUser: string;
    setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
}

const MetadataContext = createContext<MetadataContextProps | undefined>(undefined);

export const useContextMetadata = () => {
    const context = useContext(MetadataContext);

    if (!context)
        throw new Error('useContextMetadata must be used within a MetadataProvider');

    return context;
};

export const MetadataProvider = ({children}) => {
    const [userName, setUserName] = useState('');
    const [userPhoto, setUserPhoto] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const db = FIRESTORE_DB;

    SplashScreen.preventAutoHideAsync();

    useEffect(() => {

        let unsubscribe = () => {};
        setLoading(true);

        if (currentUser !== null) {
            const docRef = doc(db, "users", currentUser);
            getDoc(docRef).then((doc) => {
                if (doc.exists()) {
                    setUserName(doc.data().name + ' ' + doc.data().lastName);
                    cacheString(doc.data().name + ' ' + doc.data().lastName, 'userName');

                    setUserPhoto(doc.data().photo);
                    cacheString(doc.data().photo, 'userPhoto');
                    Image.prefetch(doc.data().photo);
                }
            });

            unsubscribe = onSnapshot(
                doc(db, "users", currentUser),
                {includeMetadataChanges: true},
                (doc) => {
                    setUserName(doc.data().name + ' ' + doc.data().lastName);
                    cacheString(doc.data().name + ' ' + doc.data().lastName, 'userName');

                    if (getCachedString('userPhoto') !== doc.data().photo)
                        Image.prefetch(doc.data().photo);

                    setUserPhoto(doc.data().photo);
                    cacheString(doc.data().photo, 'userPhoto');

                    setLoading(false);
                    SplashScreen.hideAsync();
                }
            );
        }
        else {
            getCachedString('currentUser').then((value) => {
                if (value !== null && value !== undefined) {
                    getCachedString('userName').then((value) => {
                        if (value !== null && value !== undefined) {
                            setUserName(value);

                            getCachedString('userPhoto').then((value) => {
                                if (value !== null && value !== undefined)
                                    setUserPhoto(value),
                                        Image.prefetch(value);
                            });
                        }
                    });

                    setCurrentUser(value);
                }
            });
        }

        SplashScreen.hideAsync();
        return () => unsubscribe();

    }, [currentUser]);

    return (
        <MetadataContext.Provider
            value={{
                userName, setUserName,
                userPhoto, setUserPhoto,
                loading, setLoading,
                currentUser, setCurrentUser,
            }}>
            {children}
        </MetadataContext.Provider>
    );
};