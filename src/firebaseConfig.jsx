// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD1M9VXDkGQvKZWmP9oGM_l-kbAZDG6moY",
  authDomain: "kadam-4e3dc.firebaseapp.com",
  projectId: "kadam-4e3dc",
  storageBucket: "kadam-4e3dc.firebasestorage.app",
  messagingSenderId: "508944704002",
  appId: "1:508944704002:web:327e252ee5958fbe6f7d1b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
