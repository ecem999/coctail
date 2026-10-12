import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyDcla27EZhCIUwxNZbRQUJU9cUrOk2T50A",
  authDomain: "coctail-a2226.firebaseapp.com",
  projectId: "coctail-a2226",
  storageBucket: "coctail-a2226.firebasestorage.app",
  messagingSenderId: "810368631701",
  appId: "1:810368631701:web:94593d22412f1696d9ec9c",
  measurementId: "G-6L3QE0BLW1"
};

export const isFirebaseConfigured = () => true;

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
