// Import the Firebase SDK functions you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Authentication
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQ68yas6Kb7QSB4WXEv3D4vBnAu0T6ZI0",
  authDomain: "andrewapp-b8a7d.firebaseapp.com",
  projectId: "andrewapp-b8a7d",
  storageBucket: "andrewapp-b8a7d.appspot.com", // Fix storageBucket domain
  messagingSenderId: "669104002606",
  appId: "1:669104002606:web:2e7c171ad79ad87975f1bf",
  measurementId: "G-JX6Y09SFVH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore

// Export Firebase services to use throughout your app
export { app, analytics, auth, db };
