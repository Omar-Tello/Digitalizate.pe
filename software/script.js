const searchInput = document.querySelector("#product-search");
const themeToggle = document.querySelector(".theme-toggle");
const cards = [...document.querySelectorAll("._card")];

function filterProducts() {
  const search = searchInput.value.trim().toLowerCase();

  cards.forEach((card) => {
    const text = card.textContent.toLowerCase();
    card.hidden = !text.includes(search);
  });
}

searchInput.addEventListener("input", filterProducts);
filterProducts();

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.toggle("dark-mode");
  themeToggle.setAttribute("aria-pressed", String(isDark));
});
