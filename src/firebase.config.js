// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIzEi3r3yxb7lmlra-ctCaA_ozNH1fskI",
  authDomain: "house-market-1d07d.firebaseapp.com",
  projectId: "house-market-1d07d",
  storageBucket: "house-market-1d07d.appspot.com",
  messagingSenderId: "77929032504",
  appId: "1:77929032504:web:16a9bd9ffec00bf420efcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore();