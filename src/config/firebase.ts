// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8rwgG4q98bxjcHqPyXBJHl78hRpayHqU",
  authDomain: "tictacoh-ba708.firebaseapp.com",
  projectId: "tictacoh-ba708",
  storageBucket: "tictacoh-ba708.appspot.com",
  messagingSenderId: "10921651900",
  appId: "1:10921651900:web:50774ae6d9f00ff7adeab9",
  measurementId: "G-PFN09R2JET",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const rtdb = getDatabase(app);
