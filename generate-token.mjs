// For testing the backend api authorization, this will need to be removed once the authentication itself is implemented.
// This file gets a token from a 'logged in' user from the 'Firebase Authentication Emulator Suite'
// Once the authentication (login) is done, the user's actual token will be passed to the backend inside a authorization header 

import { initializeApp } from "firebase/app";
import { getAuth, getIdToken } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAWEnKeXyZ71sezu2nYtamGinGFsF3K2I4",
    authDomain: "frank-de-pratende-bank.firebaseapp.com",
    projectId: "frank-de-pratende-bank",
    storageBucket: "frank-de-pratende-bank.firebasestorage.app",
    messagingSenderId: "618232338780",
    appId: "1:618232338780:web:3d9dd04107cee3a1014999",
    measurementId: "G-M4W30TPCTQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const user = auth.currentUser;

if (user) {
    getIdToken(user, true).then((idToken) => {
        console.log(idToken);
    }).catch((error) => {
        console.error("Error fetching ID token:", error);
    });
} else {
    console.log("No user signed in.");
}