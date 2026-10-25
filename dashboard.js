

import { auth, db } from "./company/firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  try {
    const q = query(
      collection(db, "cropSales"),
      where("farmerUid", "==", user.uid)
    );

    const snapshot = await getDocs(q);

    console.log("Your saved crops:", snapshot.docs.map(doc => doc.data()));
  } catch (error) {
    console.error("Crop loading error:", error);
    alert("Crops load nahi hui: " + error.message);
  }
});