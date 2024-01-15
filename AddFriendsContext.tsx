import React, {createContext, useContext, useEffect, useState} from 'react';
import {collection, doc, DocumentData, getDoc, getDocs, onSnapshot} from "firebase/firestore";
import {FIREBASE_AUTH, FIRESTORE_DB} from "./FireBaseConfig"
import {cacheObject, getCachedObject, getCachedString} from "./CachingFunctions";
import {useContextMetadata} from "./MetadataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {isLoading} from "expo-font";
import {Image} from "expo-image";

type UserProfile = {
	id: string;
	name: string;
	photo: string;
	lastName: string;
};
interface AddFriendsContextProps {
	userGroup: UserProfile[];
	setUserGroup: React.Dispatch<React.SetStateAction<[]>>;

	userFriends: UserProfile[];
	setUserFriends: React.Dispatch<React.SetStateAction<UserProfile[]>>;

	friendRequests: any[];
	setFriendRequests: React.Dispatch<React.SetStateAction<any[]>>;

	suggestions: [];
	setSuggestions: React.Dispatch<React.SetStateAction<[]>>;
}

const AddFriendsContext = createContext<AddFriendsContextProps | undefined>(undefined);

export const useContextAddFriends = () => {
	const context = useContext(AddFriendsContext);

	if (!context)
		throw new Error('useContextAddFriends must be used within a AddFriendsProvider');

	return context;
};
export const AddFriendsProvider = ({ children }) => {
	const {currentUser} = useContextMetadata();
	const [userGroup, setUserGroup] = useState<UserProfile[]>();
	const {userData, setUserData} = useContextMetadata();
	const [userFriends, setUserFriends] = useState<UserProfile[]>();
	const [friendRequests, setFriendRequests] = useState<[]>();
	const [suggestions, setSuggestions] = useState<[]>();



	useEffect(() => {
		let unsubscribe = () => {};

		if(userData && !suggestions) {
			const dbRef = collection(FIRESTORE_DB, 'groups', userData.country, userData.zone, userData.school, userData.grade.toString());

			unsubscribe = onSnapshot(dbRef,{
				includeMetadataChanges: true
			}, (snapshot) => {
				const updatedGroupData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as UserProfile }));

				snapshot.docs.forEach( (doc) => {
					Image.prefetch(doc.data().photo);
				});

				setUserGroup(updatedGroupData);
				cacheObject(updatedGroupData, 'userGroup');
				console.log('UserGroup:', getCachedObject('userGroup'));
			});
		}

		const unsubscribeFriendList = onSnapshot(doc(FIRESTORE_DB, 'friendList', currentUser), {
			includeMetadataChanges: true
		}, (snapshot) => {
			const updatedFriends = [];

			Object.entries(snapshot.data().friends).forEach(([key]) => {
				console.log(key);
				const dbRef = doc(FIRESTORE_DB, 'users', key);
				getDoc(dbRef).then((doc) => {
					if (doc.exists()) {
						const friendData = doc.data();
						updatedFriends.push({ id: doc.id, ...friendData as UserProfile });
						Image.prefetch(friendData.photo);
					}
				});
			});

			setUserFriends(updatedFriends);
			cacheObject(updatedFriends, 'userFriends');
			console.log('UserFriends:', updatedFriends);
		});

		const unsubscribeSuggestionsList = onSnapshot(doc(FIRESTORE_DB, 'friendList', currentUser), {
			includeMetadataChanges: true
		}, (snapshot) => {
			const updatedSuggestions = [];

			Object.entries(snapshot.data().suggestions).forEach(([key]) => {
				console.log(key);
				const dbRef = doc(FIRESTORE_DB, 'users', key);
				getDoc(dbRef).then((doc) => {
					if (doc.exists()) {
						const suggestionData = doc.data();
						updatedSuggestions.push({ id: doc.id, ...suggestionData as UserProfile });
						Image.prefetch(suggestionData.photo);
					}
				});
			});

			setUserFriends(updatedSuggestions);
			console.log('suggestions:', updatedSuggestions);
		});


		return () => {
			unsubscribeSuggestionsList();
			unsubscribe();
			unsubscribeFriendList();
		}

	}, [userData]);

	return (
		<AddFriendsContext.Provider
			value={{
				userGroup, setUserGroup,
				userFriends, setUserFriends,
				friendRequests, setFriendRequests,
				suggestions, setSuggestions
			}}>
			{children}
		</AddFriendsContext.Provider>
	);
};