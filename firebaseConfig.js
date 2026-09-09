import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBbkJ497R4tiUnFMzQX0DwC7qocD3K_4ys",
  authDomain: "mdb-app-4e714.firebaseapp.com",
  projectId: "mdb-app-4e714",
  storageBucket: "mdb-app-4e714.firebasestorage.app",
  messagingSenderId: "351686712362",
  appId: "1:351686712362:web:924b769cec700f54377753"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };