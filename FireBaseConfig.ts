import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, getReactNativePersistence, initializeAuth} from "firebase/auth";
import { getDatabase} from "firebase/database";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyBKJlatnpZzb1kkQsknGJOqWc8t1dgV8KM",
    authDomain: "ment-a41c7.firebaseapp.com",
    projectId: "ment-a41c7",
    storageBucket: "gs://ment-a41c7.appspot.com",
    messagingSenderId: "496832958894",
    appId: "1:496832958894:web:9c0166251e775170db783f",
    measurementId: "G-M402CPNQSG",
    databaseURL: "https://ment-a41c7-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
   });
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage();

export const messaging = getMessaging(FIREBASE_APP);

getToken(messaging, {vapidKey: "BIy4E3lxlUgjr4GKWAtOrJCpnogvg5E5vrOAkQF1OZ-4Kj8XnQqWtFIyLSIm033N13f_ugvRi2C7dsvRs8JtmPs"});
