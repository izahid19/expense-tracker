// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXL5_apy5DE8Y4vpvkt1vfici8d2Wgh6Y",
  authDomain: "expence-tracker-1c4c8.firebaseapp.com",
  projectId: "expence-tracker-1c4c8",
  storageBucket: "expence-tracker-1c4c8.appspot.com",
  messagingSenderId: "507007410661",
  appId: "1:507007410661:web:af6aec6f6d99defd744f0c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)