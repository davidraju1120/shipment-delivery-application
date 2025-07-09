
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBxxEU44zMDbosFLfx4vfQVmHJnRiUYWH0",
  authDomain: "shipment-delivery-applic-fffff.firebaseapp.com",
  projectId: "shipment-delivery-applic-fffff",
  storageBucket: "shipment-delivery-applic-fffff.firebasestorage.app",
  messagingSenderId: "302163090014",
  appId: "1:302163090014:web:7834747ffeedb1f59bb2cf",
  measurementId: "G-BWBTG3K3SW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const db = getAuth(app)

