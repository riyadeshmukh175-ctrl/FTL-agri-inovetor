
import { auth, db } from "./company/firebase.js";

import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const chatForm = document.getElementById("chatForm");
const messageInput = document.getElementById("messageInput");
const messages = document.getElementById("messages");
const chatTitle = document.getElementById("chatTitle");
const chatSubtitle = document.getElementById("chatSubtitle");
const chatAvatar = document.getElementById("chatAvatar");
const chatNotice = document.getElementById("chatNotice");

let currentPanel = "ai";

function addMessage(text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
}

document.querySelectorAll(".tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.classList.remove("active");
    });

    button.classList.add("active");
    currentPanel = button.dataset.panel;

    messages.replaceChildren();

    if (currentPanel === "ai") {
      chatAvatar.textContent = "🤖";
      chatTitle.textContent = "AI Farming Assistant";
      chatSubtitle.textContent = "Ask your farming questions";
      chatNotice.textContent = "AI assistant demo mode";

      addMessage(
        "Hello! 🌱 Ask me about crops, irrigation or fertilizers.",
        "received"
      );
    } else {
      chatAvatar.textContent = "🏢";
      chatTitle.textContent = "Farmer–Company Chat";
      chatSubtitle.textContent = "Buyer messaging";
      chatNotice.textContent =
        "Demo mode: Firebase messaging is not connected yet.";

      addMessage(
        "Company messaging will be connected to Firebase in the next step.",
        "received"
      );
    }
  });
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = messageInput.value.trim();

  if (!text) return;

  addMessage(text, "sent");
  messageInput.value = "";

  if (currentPanel === "ai") {
    setTimeout(() => {
      let reply =
        "Please share your crop name and describe the problem for better guidance.";

      const question = text.toLowerCase();

      if (question.includes("water") || question.includes("irrigation")) {
        reply =
          "Irrigation depends on your crop, soil and weather. Which crop are you growing?";
      } else if (
        question.includes("yellow") ||
        question.includes("leaf")
      ) {
        reply =
          "Yellow leaves can have several causes. Tell me the crop name, plant age and symptoms.";
      } else if (
        question.includes("fertilizer") ||
        question.includes("khaad")
      ) {
        reply =
          "Fertilizer needs depend on the crop and soil test. Which crop are you growing?";
      }

      addMessage(reply, "received");
    }, 500);
  } else {
    addMessage(
      "This is a demo message. Real-time delivery will work after Firebase is connected.",
      "received"
    );
  }
});
