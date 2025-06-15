// firebaseServices.js

import { Platform } from 'react-native';

let auth;
let firestore; // Example for later

if (Platform.OS === 'web') {
  // We are on the web, so we use the Web SDK
  const { getAuth } = require('firebase/auth');
  // const { getFirestore } = require('firebase/firestore'); // Example for later
  
  auth = getAuth();
  // firestore = getFirestore(); // Example for later
} else {
  // We are on native, so we use the @react-native-firebase SDK
  const authModule = require('@react-native-firebase/auth');
  // const firestoreModule = require('@react-native-firebase/firestore'); // Example for later

  auth = authModule.default;
  // firestore = firestoreModule.default; // Example for later
}

// Export the initialized services
export { auth, firestore };
