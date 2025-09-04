const modal = document.getElementById("aboutModal");
const openBtn = document.getElementById("openAbout");
const closeBtn = modal.querySelector(".close");

openBtn.onclick = (e) => {
  e.preventDefault(); // stop page jump
  modal.style.display = "flex";
};

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
