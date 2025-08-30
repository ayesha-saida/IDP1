let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCountEl = document.getElementById('cart-count');
const cartItemsEl = document.getElementById('cart-items');
const subtotalEl = document.getElementById('subtotal');
let selectedPaymentMethod = null;

function updateCartDisplay() {
  let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountEl.textContent = totalCount;
  cartItemsEl.innerHTML = '';
  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `<img src="${item.img}" alt="${
      item.name
    }"> <div class="cart-item-details"> <strong>${
      item.name
    }</strong> <br> ${item.price.toFixed(2)} x ${item.quantity} = ${(
      item.price * item.quantity
    ).toFixed(
      2
    )} <div class="cart-controls"> <button class="qty-btn" onclick="changeQuantity(${index}, -1)">−</button> <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button> </div> </div>`;
    cartItemsEl.appendChild(cartItem);

    /*This will auto hide invoice when cart is empty.*/
    if (cart.length === 0) {
      document.getElementById('invoice').style.display = 'none';
      document.getElementById('footer-buttons').style.display = 'none';
    }
  });
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  subtotalEl.textContent = `Subtotal: ${total.toFixed(2)}`;
  localStorage.setItem('cart', JSON.stringify(cart));
}

/*current button state will be updated */
function updateButtonState() {
  const confirmBtn = document.querySelector(
    '#footer-buttons button:last-child'
  );
  confirmBtn.disabled = cart.length === 0;
  confirmBtn.style.opacity = cart.length === 0 ? 0.5 : 1;
  confirmBtn.style.cursor = cart.length === 0 ? 'not-allowed' : 'pointer';
}

function changeQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  updateCartDisplay();
}

//payment method selection
document.querySelectorAll('#payment-options span').forEach(span => {
  span.addEventListener('click', () => {
    const customerName = document.getElementById('customer-name').value.trim();
    const customerPhone = document
      .getElementById('customer-phone')
      .value.trim();
    const address = document.getElementById('address').value.trim();
    const deliveryTime = document.getElementById('delivery-time').value;

    if (!customerName || !customerPhone || !address || !deliveryTime) {
      alert('All fields are required.');
      return;
    }

    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    selectedPaymentMethod = span.getAttribute('data-method');

    document.getElementById('invoice-name').textContent = customerName;

    document.getElementById('invoice-phone').textContent = customerPhone;

    document.getElementById('invoice-address').textContent = address;

    document.getElementById('invoice-delivery-time').textContent = new Date(
      deliveryTime
    ).toLocaleString();

    document.getElementById('invoice-payment-method').textContent =
      selectedPaymentMethod;

    let invoiceHTML = '<ul>';
    cart.forEach(item => {
      invoiceHTML += `<li>${item.name} — ${
        item.quantity
      } × ${item.price.toFixed(2)} = ${(item.quantity * item.price).toFixed(
        2
      )}</li>`;
    });
    invoiceHTML += '</ul>';

    document.getElementById('invoice-items').innerHTML = invoiceHTML;

    document.getElementById('invoice').style.display = 'block';

    document.getElementById('footer-buttons').style.display = 'block ';

    // Remove previous selection highlight
    document.querySelectorAll('#payment-options span').forEach(el => {
      el.classList.remove('selected');
    });

    // Highlight current one
    span.classList.add('selected');
  });
});

function cancelOrder() {
  if (confirm('Are you sure you want to cancel this order?')) {
    cart = [];
    localStorage.removeItem('cart');
    updateCartDisplay();
    alert('Order canceled.');
    window.location.reload();
  }
}

function confirmOrder() {
  const customerName = document.getElementById('customer-name').value.trim();
  const customerPhone = document.getElementById('customer-phone').value.trim();
  const address = document.getElementById('address').value.trim();
  const deliveryTime = document.getElementById('delivery-time').value;

  if (!selectedPaymentMethod) {
    alert('Please select a payment method.');
    return;
  }

  alert('✅ Order placed successfully!');
  cart = [];
  localStorage.removeItem('cart');
  localStorage.removeItem('invoice'); // remove invoice details
  window.location.reload();
  updateCartDisplay();

  document.getElementById('invoice').style.display = 'none';

  document.querySelectorAll('#payment-options span').forEach(el => {
    el.classList.remove('selected');
  });
}

updateCartDisplay();
updateButtonState();
