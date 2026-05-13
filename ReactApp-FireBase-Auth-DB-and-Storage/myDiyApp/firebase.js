// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// firebase.js
import { getAuth } from "firebase/auth"; // Note: firebase/auth here too


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDldtk7eEWaj_ljeT2MUo5koZ_W-mxzAvI",
  authDomain: "reactnativelearning-92554.firebaseapp.com",
  projectId: "reactnativelearning-92554",
  storageBucket: "reactnativelearning-92554.firebasestorage.app",
  messagingSenderId: "32277406437",
  appId: "1:32277406437:web:6b84c439a68064510c6a0c",
  measurementId: "G-RB4WZ16KG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Ensure this is exported
const analytics = getAnalytics(app);