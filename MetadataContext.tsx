import React, {createContext, useContext, useEffect, useState} from 'react';
import {doc, getDoc, onSnapshot} from "firebase/firestore";
import {Image} from "expo-image";
import {FIRESTORE_DB} from "./FireBaseConfig";
import {cacheString, getCachedString} from "./CachingFunctions";
import {Asset} from "expo-asset";
import {unsubPhotoMent} from "./UnsubscribeFunctions/PhotoMentSubs";
import {unsubServerData} from "./UnsubscribeFunctions/ServerDataSubs";

interface PhotoMentType {
    time: string
    topic: string
    posted: boolean
    name: string
}

interface PhotoMentDataType {
    userData: UserDataType;
    photo: string;
}

interface ExtraUserDataType {
    country: string;
    zone: string;
    school: string;
    grade: string;
}

interface UserDataType {
    userName: string;
    userPhoto: string;
}

interface MentSent {
    to?: UserDataType;
    toUID: string;
    question: string;
}

interface MentReceived {
    from?: UserDataType;
    fromUID: string;
    question: string;
}

interface ServerDataType {
    currentDate: string;
}

interface MetadataContextProps {
    userData: UserDataType;
    setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    currentUser: string;
    setCurrentUser: React.Dispatch<React.SetStateAction<string>>;

    polls: boolean[];
    setPolls: React.Dispatch<React.SetStateAction<boolean[]>>;

    mentsSent: MentSent[];
    setMentsSent: React.Dispatch<React.SetStateAction<MentSent[]>>;

    mentsReceived: MentReceived[];
    setMentsReceived: React.Dispatch<React.SetStateAction<MentReceived[]>>;

    photoMentsPosted: PhotoMentDataType[];
    setPhotoMentsPosted: React.Dispatch<React.SetStateAction<PhotoMentDataType[]>>;

    currentPhotoMent: PhotoMentType;
    setCurrentPhotoMent: React.Dispatch<React.SetStateAction<PhotoMentType>>;

    serverData: ServerDataType;
    setServerData: React.Dispatch<React.SetStateAction<ServerDataType>>;
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
    const [mentsSent, setMentsSent] = useState<MentSent[]>([]);
    const [mentsReceived, setMentsReceived] = useState<MentReceived[]>([]);
    const [polls, setPolls] = useState([]);
    const [photoMentsPosted, setPhotoMentsPosted] = useState<PhotoMentDataType[]>([]);
    const [extraData, setExtraData] = useState<ExtraUserDataType>({country: '', zone: '', school: '', grade: ''});
    const [currentPhotoMent, setCurrentPhotoMent] = useState<PhotoMentType>({posted: false, time: '', topic: '', name: ''});
    const [serverData, setServerData] = useState<ServerDataType>({currentDate: ''});
    const db = FIRESTORE_DB;

    useEffect(() => {

            let unsubUserData = () => {
            };
            let unsubPolls = () => {
            };
            let unsubMentsSent = () => {
            };
            let unsubMentsReceived = () => {
            };

            let unsubPhotoMentsPosted = () => {
            }


            setLoading(true);

            if (currentUser !== null) {
                const fetchData = async () => {
                    try {
                        const userDoc = await getDoc(doc(db, "users", currentUser));

                        if (userDoc.exists()) {
                            const userDocData = userDoc.data();

                            await updatePolls(userDocData, setPolls);

                            await cacheString(userDocData.name + ' ' + userDocData.lastName, 'userName');
                            await cacheString(userDocData.photo, 'userPhoto');

                            setUserData({
                                userName: userDocData.name + ' ' + userDocData.lastName,
                                userPhoto: userDocData.photo
                            })

                            setExtraData({
                                country: userDocData.country,
                                zone: userDocData.zone,
                                school: userDocData.school,
                                grade: userDocData.grade
                            })

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
                            async (doc) => {
                                await updatePolls(doc.data(), setPolls);
                            }
                        );

                    }
                );
/*
                unsubPhotoMentsPosted = onSnapshot(
                    doc(db, "groups", currentUser, extraData.country, extraData.zone, extraData.grade, 'photoMents'),
                    {includeMetadataChanges: true},
                    async (document) => {
                        const documentData = document.data();
                        const currentDate = document.data().date;
                        const photoMentsPostedArray: PhotoMentDataType[] = documentData[currentDate + ''];

                        for (const key in photoMentsPostedData) {
                            const photoMent = photoMentsPostedData[key];
                            const userRef = doc(db, "users", photoMent.to);
                            const userDoc = await getDoc(userRef);

                            if (userDoc.exists()) {
                                const userData = userDoc.data();
                                const userName = `${userData.name} ${userData.lastName}`;
                                const userPhoto = userData.photo;

                                await Asset.fromURI(userPhoto).downloadAsync();

                                photoMentsPostedArray.push({
                                    toUID: photoMent.to,
                                    photo: photoMent.photo,
                                    to: {userName, userPhoto}
                                });
                            }
                        }

                        setPhotoMentsPosted(photoMentsPostedArray);
                    }
                );
*/
                unsubMentsSent = onSnapshot(
                    doc(db, "users", currentUser, "ments", "sent"),
                    {includeMetadataChanges: true},
                    async (document) => {

                        const mentsSentData = document.data();
                        const lastArray = mentsSentData[Object.keys(mentsSentData).pop()];
                        const mentsSentArray = [];

                        if (lastArray) {
                            // Retrieve the last 5 objects from the last array
                            const last5Objects = lastArray.slice(-4);

                            // Iterate over the last 5 objects
                            for (const element of last5Objects) {
                                // Retrieve user details from the 'users' collection based on 'to' field
                                const userRef = doc(db, "users", element.to);
                                const userDoc = await getDoc(userRef);

                                if (userDoc.exists()) {
                                    const userData = userDoc.data();
                                    // Construct userName and userPhoto
                                    const userName = `${userData.name} ${userData.lastName}`;
                                    const userPhoto = userData.photo;

                                    await Asset.fromURI(userPhoto).downloadAsync();

                                    // Push the modified object to mentsSentArray
                                    mentsSentArray.push({
                                        toUID: element.to,
                                        question: element.question,
                                        to: {userName, userPhoto}
                                    });
                                }
                            }
                        }

                        setMentsSent(mentsSentArray);
                    }
                );

                unsubMentsReceived = onSnapshot(
                    doc(db, "users", currentUser, "ments", "received"),
                    {includeMetadataChanges: true},
                    async (document) => {

                        const mentsReceivedData = document.data();
                        const mentsReceivedArray = document.data().votes;

                        setMentsReceived(mentsReceivedArray.slice(-4));
                    }
                );



                unsubUserData = onSnapshot(
                    doc(db, "users", currentUser),
                    {includeMetadataChanges: true},
                    (document) => {
                        const userDocData = document.data();

                        updatePolls(userDocData, setPolls);

                        cacheString(userDocData.name + ' ' + userDocData.lastName, 'userName');

                        if (getCachedString('userPhoto') !== userDocData.photo)
                            Image.prefetch(userDocData.photo);

                        cacheString(userDocData.photo, 'userPhoto');

                        setUserData({
                            userName: userDocData.name + ' ' + userDocData.lastName,
                            userPhoto: userDocData.photo
                        })

                        setLoading(false);
                    }
                );
            } else {

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
                unsubServerData(FIRESTORE_DB, setServerData);
                unsubUserData();
                unsubPolls();
                unsubMentsSent();
                unsubMentsReceived();
                unsubPhotoMent(FIRESTORE_DB, setCurrentPhotoMent, currentPhotoMent);
            };

        },
        [currentUser]);

    return (
        <MetadataContext.Provider
            value={{
                userData, setUserData,
                loading, setLoading,
                mentsSent, setMentsSent,
                mentsReceived, setMentsReceived,
                currentUser, setCurrentUser,
                polls, setPolls,
                photoMentsPosted, setPhotoMentsPosted,
                currentPhotoMent, setCurrentPhotoMent,
                serverData, setServerData,
            }}>
            {children}
        </MetadataContext.Provider>
    );
};