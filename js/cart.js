/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  state.cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  const tbody = document.getElementById('cart-container');
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Find the table body
  const tbody = document.getElementById('cart-container');
  // TODO: Iterate over the items in the cart
  for (let i in state.cart.items) {
    const item = state.cart.items[i];
    // TODO: Create a TR
    const tr = document.createElement('tr');
    // TODO: Create a TD for the delete link, quantity,  and the item
    const remove = document.createElement('td');
    const removeLink = document.createElement('a');
    removeLink.href = '#';
    removeLink.textContent = 'Remove';
    removeLink.classList.add('remove-item');
    remove.appendChild(removeLink);
    const quantity = document.createElement('td');
    quantity.textContent = item.quantity;
    const itemTd = document.createElement('td');
    itemTd.textContent = item.product.name;
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    tr.appendChild(remove);
    tr.appendChild(quantity);
    tr.appendChild(itemTd);
    tbody.appendChild(tr);
  }
}

function removeItemFromCart(event) {
  if (!event.target.classList.contains('remove-item')) return;
  const tr = event.target.closest('tr');
  const productName = tr.querySelector('td:last-child').textContent;
  state.cart.removeItem(productName);
  state.cart.saveToLocalStorage();
renderCart();
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table
}

// This will initialize the page and draw the cart on screen
renderCart();
