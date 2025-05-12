// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from 'firebase/analytics'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-key",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "projects-2025-71366.firebaseapp.com",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "projects-2025-71366",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "projects-2025-71366.firebasestorage.app",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "149678326698",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:149678326698:web:87d0e7f114a2853fc1a1d3",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-WLRRV79T75"
};

// Initialize Firebase with error handling
let app;
let auth;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
} catch (error) {
    console.error("Firebase initialization error:", error);
    // Create a mock auth object to prevent app crashes
    auth = {
        onAuthStateChanged: (callback) => {
            console.log("Mock auth: No authentication available");
            return () => {};
        },
        signInWithPopup: () => Promise.reject(new Error("Firebase auth not available")),
        signOut: () => Promise.reject(new Error("Firebase auth not available"))
    };
}

export { auth };
// export const analytics = getAnalytics(app);