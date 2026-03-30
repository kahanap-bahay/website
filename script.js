/* Static site: nav only */
const style = document.createElement('style');
style.textContent = `
  #mobileMenuBtn {
    border: none;
    background: transparent;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  #mobileMenuBtn:hover {
    background-color: rgba(51, 65, 85, 0.05);
    border-radius: 0.375rem;
  }
  @media (min-width: 768px) {
    #mobileMenuBtn {
      display: none !important;
    }
  }
`;
document.head.appendChild(style);

function setupHamburgerMenu() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const closeIcon = document.getElementById("closeIcon");
  if (!mobileMenuBtn || !mobileMenu) return;
  mobileMenuBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
    mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
    mobileMenu.classList.toggle("hidden");
    if (hamburgerIcon) hamburgerIcon.classList.toggle("hidden");
    if (closeIcon) closeIcon.classList.toggle("hidden");
  });
  document.addEventListener("click", function(e) {
    const isMenuOpen = !mobileMenu.classList.contains("hidden");
    if (isMenuOpen && !mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      mobileMenu.classList.add("hidden");
      if (hamburgerIcon) hamburgerIcon.classList.remove("hidden");
      if (closeIcon) closeIcon.classList.add("hidden");
    }
  });
  mobileMenu.addEventListener("click", function(e) {
    if (e.target.tagName === "A") {
      mobileMenuBtn.setAttribute("aria-expanded", "false");
      mobileMenu.classList.add("hidden");
      if (hamburgerIcon) hamburgerIcon.classList.remove("hidden");
      if (closeIcon) closeIcon.classList.add("hidden");
    }
  });
}

function setupDropdown(buttonId, menuId) {
  const btn = document.getElementById(buttonId);
  const menu = document.getElementById(menuId);
  if (!btn || !menu) return;
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("hidden");
  });
  window.addEventListener("click", () => menu.classList.add("hidden"));
}

document.addEventListener("DOMContentLoaded", function() {
  setupHamburgerMenu();
  setupDropdown("desktopDropdownBtn", "desktopDropdownMenu");
});

let currentSlide = 0;
const slides = document.querySelector(".slides");
const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll(".slides img");
const totalSlides = images.length;

function updateCarousel() {
  if (!carousel || !slides || totalSlides === 0) return;
  const slideWidth = carousel.clientWidth;
  slides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}
function autoSlide() {
  if (!carousel || !slides || totalSlides === 0) return;
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}
if (carousel && slides && totalSlides > 0) {
  setInterval(autoSlide, 3000);
  window.addEventListener("resize", updateCarousel);
  window.addEventListener("load", updateCarousel);
}