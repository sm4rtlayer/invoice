const estimatedBilling = document.getElementById('estimatedBilling');
const packageInput = document.getElementById('package');
const detailsInput = document.getElementById('details');

/* Modal Elements */
const offGridModal = document.getElementById('offGridModal');
const onGridModal = document.getElementById('onGridModal');

document.getElementById('openOffGridModal').addEventListener('click', () => {
  offGridModal.classList.add('show');
});

document.getElementById('openOnGridModal').addEventListener('click', () => {
  onGridModal.classList.add('show');
});

offGridModal.querySelector('.close').addEventListener('click', () => offGridModal.classList.remove('show'));
onGridModal.querySelector('.close').addEventListener('click', () => onGridModal.classList.remove('show'));

// Click outside modal closes it
window.addEventListener('click', (e) => {
  if(e.target === offGridModal) offGridModal.classList.remove('show');
  if(e.target === onGridModal) onGridModal.classList.remove('show');
});

// Select Package from Card
document.querySelectorAll('.selectPackageBtn').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.card');
    const selectedPackage = card.dataset.package;
    const price = parseInt(card.dataset.price);

    packageInput.value = selectedPackage;
    estimatedBilling.textContent = `Estimated Billing: ₱${price.toLocaleString()}`;

    // Update package button text
    if(selectedPackage.includes('Off-Grid')) {
      document.getElementById('openOffGridModal').textContent = `Off-Grid: ${selectedPackage}`;
      offGridModal.classList.remove('show');
    } else {
      document.getElementById('openOnGridModal').textContent = `On-Grid: ${selectedPackage}`;
      onGridModal.classList.remove('show');
    }
  });
});

// Optional: Update estimated billing dynamically as details change (add extra cost per character)
detailsInput.addEventListener('input', () => {
  const selectedCard = packageInput.value;
  if(!selectedCard) return;
  const card = Array.from(document.querySelectorAll('.card'))
    .find(c => c.dataset.package === selectedCard);
  if(!card) return;
  const basePrice = parseInt(card.dataset.price);
  const extra = detailsInput.value.length * 100;
  estimatedBilling.textContent = `Estimated Billing: ₱${(basePrice + extra).toLocaleString()}`;
});
