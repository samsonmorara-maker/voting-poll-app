import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAVEu3clLBYDCX_c12vUFYWWCMTcqsdo8E",
  authDomain: "poll-app-cd463.firebaseapp.com",
  projectId: "poll-app-cd463",
  storageBucket: "poll-app-cd463.firebasestorage.app",
  messagingSenderId: "518129059042",
  appId: "1:518129059042:web:1989f050cffe9800cd4abb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export database ONLY
export const db = getFirestore(app);