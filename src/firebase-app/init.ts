import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const clientConfig = {
  apiKey: "AIzaSyDkpTX_NEKU0qoBvEA5K8HNnNq476CWkGI",
  authDomain: "bike-rentals-5f360.firebaseapp.com",
  projectId: "bike-rentals-5f360",
  storageBucket: "bike-rentals-5f360.appspot.com",
  messagingSenderId: "647494651227",
  appId: "1:647494651227:web:555a00e58836e8f8e5de7e",
  measurementId: "G-TFNYED01WM",
};

const app = initializeApp(clientConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
