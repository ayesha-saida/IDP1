/*1 - all filter together such as search,category and distance*/

function applyFilters() {
  const searchInput =
    document.getElementById('searchInput')?.value.toLowerCase() || '';
  const selectedCategory =
    document.getElementById('categoryFilter')?.value || 'all';
  const selectedArea = document.getElementById('areaFilter')?.value || '';

  const cards = document.querySelectorAll('.product-grid .product-card');

  cards.forEach(card => {
    const name = card.querySelector('.product-name').textContent.toLowerCase();
    const category = card.getAttribute('data-category');
    const area = card.getAttribute('data-area');

    const matchesSearch = name.includes(searchInput);
    const matchesCategory =
      selectedCategory === 'all' || category === selectedCategory;
    const matchesArea = selectedArea === '' || area === selectedArea;

    // Show or hide product
    card.style.display =
      matchesSearch && matchesCategory && matchesArea ? 'block' : 'none';
  });
  console.log({
    searchInput,
    selectedCategory,
    selectedArea,
    matchesSearch,
    matchesCategory,
    matchesArea,
  });
}

/*2 - Update Event Listeners to Use Unified Filtering*/

// Search on Enter press
document.addEventListener('DOMContentLoaded', function () {
  document
    .getElementById('searchInput')
    ?.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') applyFilters();
    });

  document
    .getElementById('categoryFilter')
    ?.addEventListener('change', applyFilters);

  document
    .getElementById('areaFilter')
    ?.addEventListener('change', applyFilters);

  applyFilters(); // Trigger on page load
});

/*3 - Update Cart Count for Specific Products*/
function updateCartDisplay() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Update total cart count (if needed)
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const globalCartCountEl = document.getElementById('cart-count');

  if (globalCartCountEl) {
    globalCartCountEl.textContent = totalCount;
  }

  // Update specific cart counts
  document.querySelectorAll('.cart-count[data-name]').forEach(span => {
    const name = span.dataset.name.toLowerCase();
    const item = cart.find(i => i.name.toLowerCase() === name);
    span.textContent = item ? item.quantity : 0;
  });

  localStorage.setItem('cart', JSON.stringify(cart));
}

/*4- Update the cart display whenever something is added: */
function addToCart(name, price, img) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price: parseFloat(price), img, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartDisplay();
}
/*hamburger appear when display became smaller*/
const hamburgerBtn = document.getElementById('hamburger-btn');
const header = document.getElementById('top-header');

hamburgerBtn.addEventListener('click', () => {
  header.classList.toggle('open');
});
