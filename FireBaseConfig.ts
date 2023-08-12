// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBtoh709rs6fuS8Pk8iOc-ADZGhoG7PVWY",
    authDomain: "mentt-a96e5.firebaseapp.com",
    projectId: "mentt-a96e5",
    storageBucket: "mentt-a96e5.appspot.com",
    messagingSenderId: "171757447039",
    appId: "1:171757447039:web:31e2b778140b8482aadc4a",
    measurementId: "G-36ZT99JVVE"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
