
import { initializeApp } from "firebase/app";
// Import initializeFirestore so we can add special settings
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvks_0JWZHlKUG5BldfbG__7zn2L6eA7s",
  authDomain: "poll-app-539c7.firebaseapp.com", // Changed to match your screenshot
  projectId: "poll-app-539c7",               // Changed to match your screenshot
  storageBucket: "poll-app-539c7.firebasestorage.app",
  messagingSenderId: "518129059042",
  appId: "1:518129059042:web:1989f050cffe9800cd4abb",
};

const app = initializeApp(firebaseConfig);

// This "longPolling" setting is the secret sauce for fixing "Client is Offline" errors
export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}); 
 