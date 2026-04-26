function openMenu() {
  document.getElementById("mobileMenu").classList.add("active");
}

function closeMenu() {
  document.getElementById("mobileMenu").classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#mobileMenu a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
});