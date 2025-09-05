// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCTcS8HPQvSBDLyhmgZ1-SbRh6VTjMl1H0",
  authDomain: "gamay-solarista.firebaseapp.com",
  projectId: "gamay-solarista",
  storageBucket: "gamay-solarista.appspot.com", // corrected
  messagingSenderId: "84647601122",
  appId: "1:84647601122:web:d5fb855a45516c8b0ccfbb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Save user
function saveUser(user) {
  const userData = {
    name: user.displayName,
    email: user.email,
    photo: user.photoURL
  };
  localStorage.setItem("user", JSON.stringify(userData));
  showUser();
  autofillForm();
}

// Show user info
function showUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userBox = document.getElementById("userBox");

  if (user) {
    userBox.innerHTML = `
      <img src="${user.photo}" alt="Profile">
      <span>Welcome, <b>${user.name}</b></span>
      <button id="logoutBtn">Logout</button>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      signOut(auth).then(() => {
        localStorage.removeItem("user");
        showUser();
      });
    });
  } else {
    userBox.innerHTML = `<button id="openLogin">Login</button>`;
    setupModal("openLogin", "loginModal", "closeLogin");
  }
}

// Autofill form
function autofillForm() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.getElementById("customerName").value = user.name || "";
    document.getElementById("customerEmail").value = user.email || "";
  }
}

// Google Login
document.getElementById("googleLoginBtn").addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User logged in:", result.user); // debug
    saveUser(result.user);
    document.getElementById("loginModal").classList.remove("show");
  } catch (error) {
    console.error(error);
  }
});

// Modal utility
function setupModal(openBtnId, modalId, closeBtnId) {
  const modal = document.getElementById(modalId);
  const openBtn = document.getElementById(openBtnId);
  const closeBtn = document.getElementById(closeBtnId);

  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener("click", () => modal.classList.add("show"));
  closeBtn.addEventListener("click", () => modal.classList.remove("show"));
  window.addEventListener("click", (event) => {
    if (event.target === modal) modal.classList.remove("show");
  });
}

// Run on page load
window.onload = () => {
  showUser();
  autofillForm();
};
