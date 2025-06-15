// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { Platform } from 'react-native';
const firebaseConfig = {
  apiKey: "AIzaSyBR2miIYlbO1yWq83wjwK_ZPgkNFlxApIg",
  authDomain: "manu-5460c.firebaseapp.com",
  projectId: "manu-5460c",
  storageBucket: "manu-5460c.firebasestorage.app",
  messagingSenderId: "898735786349",
  appId: "1:898735786349:web:ab8404bd2ae53e960bb264",
  measurementId: "G-EJMJDQ4W9E"
};

if (Platform.OS === 'web') {
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
}


// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);