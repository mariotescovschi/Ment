import {doc, onSnapshot} from "firebase/firestore";

export const unsubServerData = async (FIRESTORE_DB, setCurrentDate) =>
    onSnapshot(doc(FIRESTORE_DB, 'serverData', 'data'),
        {includeMetadataChanges: true},
        async (document) =>
            setCurrentDate(document.data().currentDay)
    )