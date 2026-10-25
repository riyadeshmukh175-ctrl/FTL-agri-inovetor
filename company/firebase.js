import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

    const firebaseConfig = {
  apiKey: "AIzaSyAwMLlfv8Z9sl-mHfqfyX08kSrKm2USPDs",
  authDomain: "agriconnect-ai-5ca7f.firebaseapp.com",
  projectId: "agriconnect-ai-5ca7f",
  storageBucket: "agriconnect-ai-5ca7f.firebasestorage.app",
  messagingSenderId: "863011928995",
  appId: "1:863011928995:web:a56870ef22f80968e53816",
  measurementId: "G-ZTCCH2ZT40"
};
    

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);