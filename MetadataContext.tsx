import React, {createContext, useContext, useEffect, useState} from 'react';
import {doc, getDoc, onSnapshot} from "firebase/firestore";
import {Image} from "expo-image";
import {FIRESTORE_DB} from "./FireBaseConfig";
import {cacheString, getCachedString} from "./CachingFunctions";

interface userDataType {
    userName: string;
    userPhoto: string;
}
interface MetadataContextProps {
    userData: userDataType;
    setUserData: React.Dispatch<React.SetStateAction<userDataType>>;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    currentUser: string;
    setCurrentUser: React.Dispatch<React.SetStateAction<string>>;

    polls: boolean[];
    setPolls: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const MetadataContext = createContext<MetadataContextProps | undefined>(undefined);

export const useContextMetadata = () => {
    const context = useContext(MetadataContext);

    if (!context)
        throw new Error('useContextMetadata must be used within a MetadataProvider');

    return context;
};

const updatePolls = async (userDocData, setPolls) => {
    const pollsDoc = await getDoc(doc(FIRESTORE_DB, "polls", "availability"));

    const newData = [false, false, false];
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (let i = 0; i < 3; i++) {
        const pollData = userDocData.pollsDone[i].toDate();
        pollData.setHours(0, 0, 0, 0);
        newData[i] = (currentDate > pollData);
    }

    setPolls([
        pollsDoc.data().poll1 && newData[0],
        pollsDoc.data().poll2 && newData[1],
        pollsDoc.data().poll3 && newData[2]
    ]);
}


export const MetadataProvider = ({children}) => {
    const [userData, setUserData] = useState({userName: '', userPhoto: ''});
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [polls, setPolls] = useState([]);
    const db = FIRESTORE_DB;

    useEffect(() => {

        let unsubUserData = () => {};
        let unsubPolls = () => {};

        setLoading(true);

        if (currentUser !== null) {
            const fetchData = async () => {
                try {
                    const userDoc = await  getDoc(doc(db, "users", currentUser));

                    if (userDoc.exists()) {
                        const userDocData = userDoc.data();

                        await updatePolls(userDocData, setPolls);

                        await cacheString(userDocData.name + ' ' + userDocData.lastName, 'userName');
                        await cacheString(userDocData.photo, 'userPhoto');

                        setUserData({userName: userDocData.name + ' ' + userDocData.lastName,
                            userPhoto: userDocData.photo})

                        Image.prefetch(userDocData.photo);
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();

            unsubPolls = onSnapshot(
                doc(db, "polls", "availability"),
                {includeMetadataChanges: true},
                (document) => {

                    const userDataRef = doc(db, "users", currentUser);
                    getDoc(userDataRef).then(
                        (doc) => {
                            updatePolls(doc.data(), setPolls);
                        }
                    );

                }
            );

            unsubUserData = onSnapshot(
                doc(db, "users", currentUser),
                {includeMetadataChanges: true},
                (doc) => {
                    const userDocData = doc.data();

                    updatePolls(userDocData, setPolls);

                    cacheString(userDocData.name + ' ' + userDocData.lastName, 'userName');

                    if (getCachedString('userPhoto') !== userDocData.photo)
                        Image.prefetch(userDocData.photo);

                    cacheString(userDocData.photo, 'userPhoto');

                    setUserData({userName: userDocData.name + ' ' + userDocData.lastName,
                        userPhoto: userDocData.photo})

                    setLoading(false);
                }
            );
        }
        else {

            getCachedString('currentUser').then((value) => {
                if (value !== null && value !== undefined) {
                    getCachedString('userName').then((userName) => {
                        if (userName !== null && userName !== undefined) {

                            getCachedString('userPhoto').then((userPhoto) => {
                                if (userPhoto !== null && userPhoto !== undefined)
                                    setUserData({userName: userName, userPhoto: userPhoto}),
                                        Image.prefetch(userPhoto);
                            });
                        }
                    });

                    setCurrentUser(value);
                }
            });
        }

        return () => {
            unsubUserData();
            unsubPolls();
        };

    }, [currentUser]);

    return (
        <MetadataContext.Provider
            value={{
                userData, setUserData,
                loading, setLoading,
                currentUser, setCurrentUser,
                polls, setPolls,
            }}>
            {children}
        </MetadataContext.Provider>
    );
};