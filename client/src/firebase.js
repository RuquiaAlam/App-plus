// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "appplus-c8256.firebaseapp.com",
  projectId: "appplus-c8256",
  storageBucket: "appplus-c8256.appspot.com",
  messagingSenderId: "1086307904082",
  appId: "1:1086307904082:web:c68747221ad001cc204d8b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
