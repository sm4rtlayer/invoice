// login.js
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// Use the global auth instance initialized in index.html
const auth = window.auth;
const provider = new GoogleAuthProvider();

// Select the button
const quoteBtn = document.querySelector(".btn");

quoteBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Save user info for next page
    sessionStorage.setItem("userName", user.displayName);
    sessionStorage.setItem("userPhoto", user.photoURL);
    sessionStorage.setItem("userEmail", user.email); // <-- store email

    // Redirect to quotationBillingFinal.html
    window.location.href = "quotationBillingFinal.html";
  } catch (error) {
    console.error("Login failed:", error);
    window.location.href = "index.html";
  }
});
