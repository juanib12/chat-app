import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDOKyDnbEG95ZZmNLQ0w34-Ho3J_fFfpNY",
  authDomain: ["chat-app-82ba2.firebaseapp.com"],
  projectId: "chat-app-82ba2",
  storageBucket: "chat-app-82ba2.appspot.com",
  messagingSenderId: "934096836988",
  appId: "1:934096836988:web:3cc3f955d266dd5f996cf9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { db, storage, auth };
