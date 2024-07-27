// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp, } from "firebase/app";
import { initializeAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { getFirestore, Firestore } from "firebase/firestore";
import * as  firebaseAuth from "firebase/auth"
// https://firebase.google.com/docs/web/setup#available-libraries
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from "react-native";
const firebaseConfig = {
    apiKey: "AIzaSyCwcf-XxmJDfZ79JI88nQWhk2jzcQOy2CQ",
    authDomain: "rs-enterprises-e9215.firebaseapp.com",
    projectId: "rs-enterprises-e9215",
    storageBucket: "rs-enterprises-e9215.appspot.com",
    messagingSenderId: "832937174961",
    appId: "1:832937174961:web:c277e7c19c8cf5fa197f90",
    measurementId: "G-379PEJD4KM"
};
const reactNativePersistence: any = firebaseAuth.getReactNativePersistence;
let FIREBASE_AUTH: firebaseAuth.Auth
let FIREBASE_STORE: Firestore
// Initialize Firebase
if (!getApps().length) {
    console.log("intiallizaing the instance")
    const FIREBASE_APP = initializeApp(firebaseConfig);
    FIREBASE_AUTH = Platform.OS === "web" ? initializeAuth(FIREBASE_APP) : initializeAuth(FIREBASE_APP, { persistence: reactNativePersistence(ReactNativeAsyncStorage) })
    FIREBASE_STORE = getFirestore(FIREBASE_APP);
    // FIREBASE_AUTH.onAuthStateChanged
} else {
    getApp()
}
const createUserWithUsernameAndPassword = async (username: string, password: string) => {
    const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, username, password)
        .then((userCredential) => { return { "user": userCredential.user, "success": true, "error": null } })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                return { "error": error, "error_message": 'That email address is already in use!', "success": false }
            }
            if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');

                return { "error": error, "error_message": 'That email address is invalid!', "success": false }
            }
            console.error(JSON.stringify(error))
            console.error(error)
        })
    return response
}
const loginUserWithUsernameAndPassword = async (username: string, password: string) => {
    return signInWithEmailAndPassword(FIREBASE_AUTH, username, password)
}
const onAuthStateChange = (loginCallBack: Function, logoutCallback: Function) => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            const uid = user.uid;
            loginCallBack(user)
            // ...
        } else {
            // User is signed out
            logoutCallback()
            // ...
        }
    });
}


export { FIREBASE_STORE, createUserWithUsernameAndPassword, loginUserWithUsernameAndPassword, onAuthStateChange } 
