// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ecommerce-app-4f3dd.firebaseapp.com",
  projectId: "ecommerce-app-4f3dd",
  storageBucket: "ecommerce-app-4f3dd.appspot.com",
  messagingSenderId: "993257249831",
  appId: "1:993257249831:web:37f3c882320e5836e60202"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);