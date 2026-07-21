import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzIBprsoHBXZp50R3M--HgT3e_3mnujvI",
  authDomain: "alertx-91f11.firebaseapp.com",
  projectId: "alertx-91f11",
  storageBucket: "alertx-91f11.firebasestorage.app",
  messagingSenderId: "474196484693",
  appId: "1:474196484693:web:9279ef82cf658a77086adc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;