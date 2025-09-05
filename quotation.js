// Modal functionality
const modal = document.getElementById('packageModal');
const openModalBtn = document.getElementById('openPackageModal');
const closeModalBtn = modal.querySelector('.close');
const packageInput = document.getElementById('package');
const estimatedBilling = document.getElementById('estimatedBilling');

openModalBtn.addEventListener('click', () => {
  modal.classList.add('show');
});

closeModalBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
  if(e.target === modal) modal.classList.remove('show');
});

// Package selection
document.querySelectorAll('.packageOption').forEach(btn => {
  btn.addEventListener('click', () => {
    const selected = btn.dataset.package;
    packageInput.value = selected;
    openModalBtn.textContent = `Package: ${selected}`;
    modal.classList.remove('show');
    calculateBilling();
  });
});

// Dynamic Forecast Billing
const detailsInput = document.getElementById('details');

detailsInput.addEventListener('input', calculateBilling);

function calculateBilling() {
  const packageType = packageInput.value;
  const detailsLength = detailsInput.value.length;

  let baseCost = 0;

  if(packageType === 'off-grid') {
    baseCost = 50000; // example fixed cost for off-grid
  } else if(packageType === 'on-grid') {
    baseCost = 70000; // example fixed cost for on-grid
  }

  // Extra cost based on details length
  const extraCost = detailsLength * 100; 

  const total = baseCost + extraCost;

  estimatedBilling.textContent = `Estimated Billing: ₱${total.toLocaleString()}`;
}
