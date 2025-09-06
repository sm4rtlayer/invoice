// ===============================
// Quotation Modal & Billing Logic
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  const estimatedBilling = document.getElementById("estimatedBilling");

  // Buttons to open modals
  const openOffGridBtn = document.getElementById("openOffGrid");
  const openOnGridBtn = document.getElementById("openOnGrid");

  // Modals
  const offGridModal = document.getElementById("offGridModal");
  const onGridModal = document.getElementById("onGridModal");

  // Close buttons
  const closeButtons = document.querySelectorAll(".modalQuote .close");

  // ========================
  // Modal open functionality
  // ========================
  openOffGridBtn.addEventListener("click", () => {
    offGridModal.classList.add("show");
  });

  openOnGridBtn.addEventListener("click", () => {
    onGridModal.classList.add("show");
  });

  // ========================
  // Modal close functionality
  // ========================
  closeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const modalId = btn.getAttribute("data-close");
      document.getElementById(modalId).classList.remove("show");
    });
  });

  // Close modal when clicking outside content
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modalQuote")) {
      event.target.classList.remove("show");
    }
  });

let lastSelected = null; // store last selected package details

// Helper: format money with ₱ and 2 decimals
function formatCurrency(amount) {
  return "₱" + amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function updateForecast() {
  if (!lastSelected) {
    document.getElementById("estimatedBilling").innerHTML =
      `<p style="color:red;">⚠ Please select a package first.</p>`;
    return;
  }

  const { selectedPackage, capacity, price } = lastSelected;

  // Get configurable inputs
  const electricityRate = parseFloat(document.getElementById("electricityRate").value) || 10;
  const sunHoursPerDay = parseFloat(document.getElementById("sunHours").value) || 4;
  const daysPerMonth = 30;

  // Convert W → kW
  const capacityKW = capacity / 1000;

  // Monthly production in kWh
  const monthlyProduction = capacityKW * sunHoursPerDay * daysPerMonth;

  // Monthly savings
  const monthlySavings = monthlyProduction * electricityRate;

  // Payback period
  const paybackMonths = monthlySavings > 0 ? (price / monthlySavings) : 0;

  // Update forecast billing
  const estimatedBilling = document.getElementById("estimatedBilling");
  estimatedBilling.innerHTML =
    `<div>
      <p><strong>Selected:</strong> ${selectedPackage}</p>
      <p><strong>Capacity:</strong> ${capacityKW.toFixed(2)} kW</p>
      <p><strong>Estimated Cost:</strong> ${formatCurrency(price)}</p>
      <p><strong>Estimated Production:</strong> ${monthlyProduction.toFixed(1)} kWh/month</p>
      <p style="color:green;"><strong>Estimated Savings per Month:</strong> ${formatCurrency(monthlySavings)}</p>
      <p style="color:#007BFF;"><strong>Payback Period:</strong> ${paybackMonths.toFixed(1)} months</p>
    </div>`;
}

// Handle package selection
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const selectedPackage = card.querySelector("h4").textContent;
    const capacityText = card.querySelector("p:nth-of-type(1)").textContent;
    const priceText = card.querySelector("p:nth-of-type(2)").textContent;

    const capacity = parseFloat(capacityText.replace(/[^0-9.]/g, "")); // W
    const price = parseFloat(priceText.replace(/[^0-9.]/g, "")); // ₱

    lastSelected = { selectedPackage, capacity, price };

    updateForecast();

    const modalId = card.closest(".modalQuote").id;
    document.getElementById(modalId).classList.remove("show");
  });
});

// Auto-update when inputs change
document.getElementById("electricityRate").addEventListener("input", updateForecast);
document.getElementById("sunHours").addEventListener("input", updateForecast);

  // ========================
  // Form submission (demo)
  // ========================
  const quotationForm = document.getElementById("quotationForm");
  quotationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Quotation request submitted successfully!");
  });
});









