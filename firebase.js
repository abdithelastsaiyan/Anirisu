import { initializeApp } from "firebase/app"
import { getAuth } from  'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBuqzhJYyz30FVZmD1VfwVZx0jugv2wYDM",
    authDomain: "anirisu-fe3c9.firebaseapp.com",
    projectId: "anirisu-fe3c9",
    storageBucket: "anirisu-fe3c9.appspot.com",
    messagingSenderId: "532367365075",
    appId: "1:532367365075:web:be2183e11ae2094bf9d526",
    measurementId: "G-2CQ4H90SKB"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

export { app, auth }