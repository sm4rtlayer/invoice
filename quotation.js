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

document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("click", () => {
    const selectedPackage = card.querySelector("h4").textContent;
    const capacityText = card.querySelector("p:nth-of-type(1)").textContent;
    const priceText = card.querySelector("p:nth-of-type(2)").textContent;

    // Extract numbers
    const capacity = parseFloat(capacityText.replace(/[^0-9.]/g, ""));
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

    // ⚡ Calculate estimated monthly savings using CONFIG
    const monthlySavings = capacity * CONFIG.electricityRate * CONFIG.daysPerMonth;

    // Payback period
    const paybackMonths = monthlySavings > 0 ? (price / monthlySavings) : 0;

    // Update forecast billing
    const estimatedBilling = document.getElementById("estimatedBilling");
    estimatedBilling.innerHTML =
      `<div>
        <p><strong>Selected:</strong> ${selectedPackage}</p>
        <p><strong>Capacity:</strong> ${capacity} kWh</p>
        <p><strong>Estimated Cost:</strong> ₱${price.toLocaleString()}</p>
        <p style="color:green;"><strong>Estimated Savings per Month:</strong> ₱${monthlySavings.toLocaleString()}</p>
        <p style="color:#007BFF;"><strong>Payback Period:</strong> ${paybackMonths.toFixed(1)} months</p>
      </div>`;

    // Close modal
    const modalId = card.closest(".modalQuote").id;
    document.getElementById(modalId).classList.remove("show");
  });
});

});

  // ========================
  // Form submission (demo)
  // ========================
  const quotationForm = document.getElementById("quotationForm");
  quotationForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Quotation request submitted successfully!");
  });
});




