import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBvVyEfKX7m3iecxYoTZT-11G8UFp0LT0",
  authDomain: "syamapp-955e0.firebaseapp.com",
  projectId: "syamapp-955e0",
  storageBucket: "syamapp-955e0.firebasestorage.app",
  messagingSenderId: "599757311255",
  appId: "1:599757311255:web:611944a900e2351bdf7b52",
  measurementId: "G-8V6WTSQGMT",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);