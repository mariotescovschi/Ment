import {doc, getDoc, onSnapshot, updateDoc} from "firebase/firestore";

export const unsubPhotoMent = async (FIRESTORE_DB, setCurrentPhotoMent, currentDate) =>
    onSnapshot(doc(FIRESTORE_DB, 'photoMents', 'availability'),
        {includeMetadataChanges: true},
        async (document) => {
            const photoMents = document.data();

            const currentTopic = photoMents.topics.find((topic) => topic.available === true);
            const currentTopicIndex = photoMents.topics.indexOf(currentTopic);

            setCurrentPhotoMent({
                ...currentTopic,
                posted: false,
                name: currentDate + '-' + currentTopicIndex,
            });
        }
    )

export const latestPhotosMented = async (FIRESTORE_DB, currentUserData, currentPhotoMent) =>
    onSnapshot(doc(FIRESTORE_DB, 'groups', currentUserData.country, currentUserData.zone, currentUserData.school, currentUserData.grade, 'photoMents'),
        async (document) => {
            const photoMents = document.data();

            const latestPhotoMents = photoMents[currentPhotoMent.name].ments;

            const latestFifteenUserUIDs = latestPhotoMents
                .filter(item => item.userUID !== currentUserData.uid)
                .slice(-15)
                .map(item => item.userUID);

            if (latestFifteenUserUIDs.length >= 14)
                await updateDoc(document.ref, {
                    [`${currentPhotoMent.name}.votedStarted`]: true,
                })
        }
    )

export const unsubPhotoMentVoteStarted = async (FIRESTORE_DB, currentUserData, currentPhotoMent, setVoteStarted) =>
    onSnapshot(doc(FIRESTORE_DB, 'groups', currentUserData.country, currentUserData.zone, currentUserData.school, currentUserData.grade, 'photoMents'),
        {includeMetadataChanges: true},
        async (document) => {
            const documentData = document.data();
            const currentPhotoMentData = documentData[currentPhotoMent.name];

            setVoteStarted(currentPhotoMentData.votedStarted);
        }
    )