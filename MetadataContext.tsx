import React, {createContext, useContext, useEffect, useState} from 'react';
import * as SplashScreen from "expo-splash-screen";
import {doc, DocumentData, getDoc, onSnapshot} from "firebase/firestore";
import {Image} from "expo-image";
import {FIRESTORE_DB} from "./FireBaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {cacheObject, getCachedObject, getCachedString} from "./CachingFunctions";


interface MetadataContextProps {
	userName: string;
	setUserName: React.Dispatch<React.SetStateAction<string>>;

	userPhoto: string;
	setUserPhoto: React.Dispatch<React.SetStateAction<string>>;

	loading: boolean;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;

	currentUser: string;
	setCurrentUser: React.Dispatch<React.SetStateAction<string>>;

	userData: DocumentData;
	setUserData: React.Dispatch<React.SetStateAction<DocumentData>>;
}

const MetadataContext = createContext<MetadataContextProps | undefined>(undefined);

export const useContextMetadata = () => {
	const context = useContext(MetadataContext);

	if (!context)
		throw new Error('useContextMetadata must be used within a MetadataProvider');

	return context;
};

export const MetadataProvider = ({ children }) => {
	const [userName, setUserName] = useState('');
	const [userPhoto, setUserPhoto] = useState('');
	const [loading, setLoading] = useState(true);
	const [currentUser, setCurrentUser] = useState(null);
	const [userData, setUserData] = useState<DocumentData>();
	const db = FIRESTORE_DB;

	SplashScreen.preventAutoHideAsync();

	const preFetch = async () => {
		console.log(userData);
			const docRef = doc(db, "users", currentUser);
			getDoc(docRef).then((doc) => {
				if (doc.exists()) {
					setUserData(doc.data());
					cacheObject(doc.data(), 'userData');
				} else {
					console.log("No such document!");
				}
			}).catch((error) => {
				console.log("Error getting document:", error);
			});

	}

	if(!userData && currentUser)
		preFetch();

	useEffect(() => {
		let unsubscribe = () => {};

		//Loading screen sau ceva pulai
		setLoading(true);
		if(!currentUser)
			AsyncStorage.getItem('currentUser').then((value) => {
				if(value !== null)
					setCurrentUser(value);
			});

		else{
			AsyncStorage.setItem('currentUser', currentUser);

			unsubscribe = onSnapshot(
				doc(db, "users", currentUser),
				{ includeMetadataChanges: true },
				(doc) => {
					setUserName(doc.data().name + ' ' + doc.data().lastName);
					AsyncStorage.setItem('userName', doc.data().name + ' ' + doc.data().lastName);

					setUserPhoto(doc.data().photo);
					AsyncStorage.setItem('userPhoto', doc.data().photo);

					if(getCachedString('userPhoto') !== doc.data().photo)
						Image.prefetch(userPhoto);

					setLoading(false);
					SplashScreen.hideAsync();
				}
			);


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
				userData, setUserData,
			}}>
			{children}
		</MetadataContext.Provider>
	);
};