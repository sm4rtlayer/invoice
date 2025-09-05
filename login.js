// login.js
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// Access auth from the global window object
const auth = window.auth;
const provider = new GoogleAuthProvider();

// Select the button
const quoteBtn = document.querySelector(".btn");

quoteBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // Prevent default link behavior
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Save user info for next page
    sessionStorage.setItem("userName", user.displayName);
    sessionStorage.setItem("userPhoto", user.photoURL);

    // Redirect to quotationBillingFinal.html
    window.location.href = "quotationBillingFinal.html";
  } catch (error) {
    console.error("Login failed:", error);
    // Stay on current page
    window.location.href = "index.html";
  }
});
