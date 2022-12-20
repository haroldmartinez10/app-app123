import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCfsP5OU1R6cwp4WkxgbbM1wvCNYydPV8A",
    authDomain: "login-stories.firebaseapp.com",
    projectId: "login-stories",
    storageBucket: "login-stories.appspot.com",
    messagingSenderId: "657632604406",
    appId: "1:657632604406:web:068e087f71889d1057fcd7"
};

const app = initializeApp(firebaseConfig);


export const db = getFirestore(app)
const auth = getAuth(app);

