
import { auth, db } from "./company/firebase.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("emailMobile");
const passwordInput = document.getElementById("password");

// Find the user's saved role in Firestore.
async function getUserRole(uid) {
    const profileLocations = [
        { collection: "farmers", role: "farmer" },
        { collection: "customer", role: "customer" },
        { collection: "companies", role: "company" },
        { collection: "admin", role: "admin" },
        { collection: "logistics", role: "logistics" }
    ];

    for (const location of profileLocations) {
        try {
            console.log("Checking collection:", location.collection);

            const profileRef = doc(db, location.collection, uid);
            const profileSnapshot = await getDoc(profileRef);

            console.log("Document exists:", profileSnapshot.exists());

            if (profileSnapshot.exists()) {
                const profile = profileSnapshot.data();

                console.log("Profile data:", profile);

                if (profile.role === location.role) {
                    return profile.role;
                }
            }
        } catch (error) {
            console.error(
                "Could not read " + location.collection + " profile:",
                error.code
            );

            // Continue only to diagnose other profile locations.
        }
    }

    return null;
}

const destinations = {
  farmer: "dashboard.html",
  customer: "customer/dashboard.html",
  admin: "index.html",
  company: "company/dashboard.html",
  logistics: "logistics/dashboard.html"
};

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const selectedRole = document.getElementById("userRole").value;

  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const role = await getUserRole(credential.user.uid);
    console.log("Selected role:", selectedRole);
console.log("Saved Firebase role:", role);
console.log("Logged-in UID:", credential.user.uid);
    if (role !== selectedRole) {
  await signOut(auth);
  alert("You have selected the wrong role. Please select your correct role.");
  return;
}

    if (!role || !destinations[role]) {
      await signOut(auth);
      alert("User role not found. Please contact the administrator.");
      return;
    }

    window.location.replace(destinations[role]);

  } catch (error) {
    console.error("Login error:", error);

    alert(
      error.code === "auth/invalid-credential"
        ? "Email ya password galat hai."
        : "Login nahi hua: " + error.message 
    );
  }
});

// Password show/hide
window.togglePassword = function () {
  passwordInput.type =
    passwordInput.type === "password" ? "text" : "password";
};
