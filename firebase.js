// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDiZV3lLGCw8yLlunD9NYHFp1Okgj0Yilg",
  authDomain: "tyson-48cbd.firebaseapp.com",
  projectId: "tyson-48cbd",
  storageBucket: "tyson-48cbd.appspot.com", // ✅ FIXED
  messagingSenderId: "332942837939",
  appId: "1:332942837939:web:55343e7e6d7e90e30288c6",
  measurementId: "G-8SQDHPFPRY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics =
  typeof window !== "undefined" ? getAnalytics(app) : null;
