// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDldtk7eEWaj_ljeT2MUo5koZ_W-mxzAvI",
    authDomain: "reactnativelearning-92554.firebaseapp.com",
    projectId: "reactnativelearning-92554",
    storageBucket: "reactnativelearning-92554.firebasestorage.app",
    messagingSenderId: "32277406437",
    appId: "1:32277406437:web:699a7afcdc7d762b0c6a0c",
    measurementId: "G-1LCJGN6MKQ"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
