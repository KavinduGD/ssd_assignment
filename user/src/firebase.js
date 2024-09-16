import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_VITE_FIREBASE_API_KEY,
  authDomain: "kts-fireproject.firebaseapp.com",
  projectId: "kts-fireproject",
  storageBucket: "kts-fireproject.appspot.com",
  messagingSenderId: "843087780921",
  appId: "1:843087780921:web:b69c312188e7860f1f01e8",
};
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();
