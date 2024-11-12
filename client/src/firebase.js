// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-19b43.firebaseapp.com",
  projectId: "mern-auth-19b43",
  storageBucket: "mern-auth-19b43.firebasestorage.app",
  messagingSenderId: "375188724627",
  appId: "1:375188724627:web:1820ffbd819854e533a666",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
