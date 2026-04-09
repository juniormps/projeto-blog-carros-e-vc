import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDOdph0fnrleWSCvfUeHK3J8RCsHEs3I68",
  authDomain: "miniblog-c44a7.firebaseapp.com",
  projectId: "miniblog-c44a7",
  storageBucket: "miniblog-c44a7.firebasestorage.app",
  messagingSenderId: "757823472150",
  appId: "1:757823472150:web:6481809b2279f6b2796b37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

export { db }