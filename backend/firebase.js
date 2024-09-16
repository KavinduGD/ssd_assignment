// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "kts-fireproject.firebaseapp.com",
  projectId: "kts-fireproject",
  storageBucket: "kts-fireproject.appspot.com",
  messagingSenderId: "843087780921",
  appId: "1:843087780921:web:b69c312188e7860f1f01e8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
