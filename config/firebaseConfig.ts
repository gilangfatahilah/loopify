// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: "loopify-409ae.firebaseapp.com",
  projectId: "loopify-409ae",
  storageBucket: "loopify-409ae.appspot.com",
  messagingSenderId: "795581436271",
  appId: "1:795581436271:web:f79ed1a068d17c9312589a",
  measurementId: "G-XTF1WM5MQ5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
