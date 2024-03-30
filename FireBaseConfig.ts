import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

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
