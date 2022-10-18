import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCaj9mgvhmvUOGcohn7ag4QL8chP0Lkv_c",
  authDomain: "tutorial-4b768.firebaseapp.com",
  projectId: "tutorial-4b768",
  storageBucket: "tutorial-4b768.appspot.com",
  messagingSenderId: "1089591474947",
  appId: "1:1089591474947:web:9d2eef7447b7d858b54736"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore()
export const auth = getAuth(app)