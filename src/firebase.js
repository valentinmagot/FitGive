import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'


const app = firebase.initializeApp({
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY ,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID
    apiKey: "AIzaSyB7jN9Kwod1dotZKbX_U3EH54nTFppHJT8",
    authDomain: "fitgive---devlopment.firebaseapp.com",
    projectId: "fitgive---devlopment",
    storageBucket: "fitgive---devlopment.appspot.com",
    messagingSenderId: "242398802141",
    appId: "1:242398802141:web:c329f3a41d3bc87f7cab34"
})

export const auth = app.auth();
export const db = app.firestore();
export default app