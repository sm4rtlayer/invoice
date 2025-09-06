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
  const packageButtons = document.querySelectorAll(".selectPackageBtn");

  packageButtons.forEach(button => {
    button.addEventListener("click", () => {
      const packageName = button.getAttribute("data-package");

      // Example pricing & capacity (could be fetched from DB)
      let billingText = "";
      switch (packageName) {
        case "Off-Grid Set 1":
          billingText = "You selected Off-Grid Set 1 (3 kWh, $2,000). Estimated monthly bill savings: $50–$70.";
          break;
        case "Off-Grid Set 2":
          billingText = "You selected Off-Grid Set 2 (5 kWh, $3,500). Estimated monthly bill savings: $90–$120.";
          break;
        case "Off-Grid Set 3":
          billingText = "You selected Off-Grid Set 3 (7 kWh, $5,000). Estimated monthly bill savings: $130–$160.";
          break;
        case "On-Grid Set 1":
          billingText = "You selected On-Grid Set 1 (3 kWh, $1,800). Estimated monthly bill savings: $40–$60.";
          break;
        case "On-Grid Set 2":
          billingText = "You selected On-Grid Set 2 (6 kWh, $3,200). Estimated monthly bill savings: $100–$140.";
          break;
        case "On-Grid Set 3":
          billingText = "You selected On-Grid Set 3 (10 kWh, $4,500). Estimated monthly bill savings: $160–$200.";
          break;
        default:
          billingText = "No package selected.";
      }

      estimatedBilling.textContent = billingText;

      // Close the modal after selection
      const modal = button.closest(".modalQuote");
      modal.classList.remove("show");
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
