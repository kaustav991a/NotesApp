// /firebase/index.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDK97-6eGKKg-XPVbsYetzdG9pjJ0fy_Sc",
    authDomain: "notesapp-f5215.firebaseapp.com",
    projectId: "notesapp-f5215",
    storageBucket: "notesapp-f5215.firebasestorage.app",
    messagingSenderId: "740572110227",
    appId: "1:740572110227:web:30a9504394c5f12f45dc66",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);