import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import {getFunctions} from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCnvl6Eb5_-_XByz9J_1Bl7b8DJvP8gUpU",
    authDomain: "ment-12376.firebaseapp.com",
    projectId: "ment-12376",
    storageBucket: "gs://ment-12376.appspot.com",
    messagingSenderId: "948519822715",
    appId: "1:948519822715:web:5877bb6ec8cc399097c9de",
    measurementId: "G-NXSX047H1Z"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
   });
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_FUNCTIONS = getFunctions(FIREBASE_APP, "europe-central2r");
