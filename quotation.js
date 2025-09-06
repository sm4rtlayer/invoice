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

  // ========================
  // Package selection logic
  // ========================
 document.querySelectorAll(".selectPackageBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    const selectedPackage = btn.getAttribute("data-package");
    const card = btn.closest(".card");
    const capacityText = card.querySelector("p:nth-of-type(1)").textContent; // e.g. "Capacity: 5 kWh"
    const priceText = card.querySelector("p:nth-of-type(2)").textContent;   // e.g. "Price: $3,500"

    // Extract numbers safely
    const capacity = parseFloat(capacityText.replace(/[^0-9.]/g, ""));
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

    // Update billing dynamically with Peso symbol
    const estimatedBilling = document.getElementById("estimatedBilling");
    estimatedBilling.textContent = 
      `Selected: ${selectedPackage} | Capacity: ${capacity} kWh | Estimated Cost: ₱${price.toLocaleString()}`;

    // Close modal
    const modalId = btn.closest(".modalQuote").id;
    document.getElementById(modalId).classList.remove("show");
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
