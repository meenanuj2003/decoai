// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "ai-room-redesign-c4dfd.firebaseapp.com",
  projectId: "ai-room-redesign-c4dfd",
  storageBucket: "ai-room-redesign-c4dfd.firebasestorage.app",
  messagingSenderId: "485722540554",
  appId: "1:485722540554:web:5bcb397684a31f20a82df3",
  measurementId: "G-Q11FGBZ6NL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
