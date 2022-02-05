import { initializeApp,getApps,getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBKOFJtIAoKYsl01wMkKugTPImLp5g2EfA",
  authDomain: "chat-app-3c68d.firebaseapp.com",
  projectId: "chat-app-3c68d",
  storageBucket: "chat-app-3c68d.appspot.com",
  messagingSenderId: "743089063410",
  appId: "1:743089063410:web:41db4d1b984a2522d8976b"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore()


export {app,db}