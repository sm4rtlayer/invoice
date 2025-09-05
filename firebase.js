// firebase.js
// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged } 
    from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// ✅ Your Firebase Config (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCTcS8HPQvSBDLyhmgZ1-SbRh6VTjMl1H0",
  authDomain: "gamay-solarista.firebaseapp.com",
  projectId: "gamay-solarista",
  storageBucket: "gamay-solarista.firebasestorage.app",
  messagingSenderId: "84647601122",
  appId: "1:84647601122:web:d5fb855a45516c8b0ccfbb"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Save user to localStorage
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

// Autofill form with logged in user
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
    saveUser(result.user);
    document.getElementById("loginModal").classList.remove("show");
  } catch (error) {
    console.error(error);
  }
});

// Facebook Login
document.getElementById("facebookLoginBtn").addEventListener("click", async () => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    saveUser(result.user);
    document.getElementById("loginModal").classList.remove("show");
  } catch (error) {
    console.error(error);
  }
});

// Reusable modal function
function setupModal(openBtnId, modalId, closeBtnId) {
  const modal = document.getElementById(modalId);
  const openBtn = document.getElementById(openBtnId);
  const closeBtn = document.getElementById(closeBtnId);

  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener("click", () => {
    modal.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.classList.remove("show");
    }
  });
}

// Quotation Calculator
window.calculate = function() {
  const name = document.getElementById("customerName").value;
  const capacity = parseFloat(document.getElementById("capacity").value);
  const sunHours = parseFloat(document.getElementById("sunHours").value);
  const rate = parseFloat(document.getElementById("rate").value);
  const monthlyBill = parseFloat(document.getElementById("monthlyBill").value);

  const dailyKWh = capacity * sunHours;
  const monthlyKWh = dailyKWh * 30;
  const monthlySavings = monthlyKWh * rate;
  const annualSavings = monthlySavings * 12;

  const newBill = monthlyBill - monthlySavings > 0 ? monthlyBill - monthlySavings : 0;
  const totalCost = capacity * 50000; // Example cost per kW
  const paybackPeriod = totalCost > 0 ? totalCost / monthlySavings : 0;
  const roi = totalCost > 0 ? (annualSavings / totalCost) * 100 : 0;

  const resultBox = document.getElementById("result");
  resultBox.style.display = "block";
  resultBox.innerHTML = `
    <h3>Quotation for ${name}</h3>
    <p><b>System Capacity:</b> ${capacity} kW</p>
    <p><b>Estimated Daily Production:</b> ${dailyKWh.toFixed(2)} kWh</p>
    <p><b>Estimated Monthly Production:</b> ${monthlyKWh.toFixed(2)} kWh</p>
    <p><b>Current Monthly Bill:</b> ₱${monthlyBill.toLocaleString()}</p>
    <p><b>Estimated Savings Per Month:</b> ₱${monthlySavings.toFixed(2)}</p>
    <p><b>Estimated Annual Savings:</b> ₱${annualSavings.toFixed(2)}</p>
    <p><b>New Estimated Bill:</b> ₱${newBill.toFixed(2)}</p>
    <p><b>Total System Cost:</b> ₱${totalCost.toLocaleString()}</p>
    <p><b>Payback Period:</b> ${paybackPeriod.toFixed(1)} months</p>
    <p><b>ROI:</b> ${roi.toFixed(1)}% per year</p>
  `;
};

// Run on page load
window.onload = () => {
  showUser();
  autofillForm();
};

