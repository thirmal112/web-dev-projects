document.addEventListener("DOMContentLoaded", () => {
  const categoryFilter = document.getElementById('category-filter');
  const priceFilter = document.getElementById('price-filter');
  const sortFilter = document.getElementById('sort-filter');
  const productList = document.getElementById('product-list');
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  const cartBtn = document.getElementById('cart-btn');
  const cartCount = document.getElementById('cart-count');
  const quickViewModal = document.getElementById('quick-view-modal');
  const quickViewDetails = document.getElementById('quick-view-details');
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  const cartModal = document.getElementById('cart-modal');
  const cartItemsList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const clearCartBtn = document.getElementById('clear-cart-btn');
  const checkoutModal = document.getElementById('checkout-modal');
  const placeOrderBtn = document.getElementById('place-order-btn');

  // Product data with images and descriptions
  const products = {
    1: { id: 1, name: "Smartphone", price: 299, rating: 4.5, category: "electronics", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop", description: "Latest smartphone with advanced features and high-performance camera." },
    2: { id: 2, name: "Noise Cancelling Headphones", price: 699, rating: 4.8, category: "electronics", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=200&fit=crop", description: "Premium wireless headphones with active noise cancellation technology." },
    3: { id: 3, name: "Smartwatch", price: 199, rating: 4.2, category: "electronics", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop", description: "Smart fitness tracker with heart rate monitoring and GPS." },
    4: { id: 4, name: "4K Monitor", price: 1099, rating: 4.6, category: "electronics", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=300&h=200&fit=crop", description: "Ultra-high definition monitor perfect for gaming and professional work." },
    5: { id: 5, name: "Jacket", price: 89, rating: 3.9, category: "clothing", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=200&fit=crop", description: "Stylish and warm jacket for cold weather." },
    6: { id: 6, name: "Jeans", price: 59, rating: 4.1, category: "clothing", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=300&h=200&fit=crop", description: "Comfortable and durable denim jeans." },
    7: { id: 7, name: "Hoodie", price: 39, rating: 3.8, category: "clothing", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=200&fit=crop", description: "Casual and cozy hoodie for everyday wear." },
    8: { id: 8, name: "Designer Cap", price: 129, rating: 4.3, category: "clothing", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&h=200&fit=crop", description: "Premium designer cap with unique styling." },
    9: { id: 9, name: "JavaScript Book", price: 19, rating: 4.8, category: "books", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=200&fit=crop", description: "Comprehensive guide to modern JavaScript programming." },
    10: { id: 10, name: "Python for Beginners", price: 24, rating: 4.7, category: "books", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=200&fit=crop", description: "Perfect introduction to Python programming language." },
    11: { id: 11, name: "Mastering React", price: 29, rating: 4.6, category: "books", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop", description: "Advanced React development techniques and best practices." },
    12: { id: 12, name: "HTML & CSS Guide", price: 15, rating: 4.1, category: "books", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop", description: "Complete guide to web development fundamentals." },
    13: { id: 13, name: "Laptop", price: 499, rating: 4.2, category: "electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop", description: "High-performance laptop for work and entertainment." },
    14: { id: 14, name: "Gaming PC", price: 1299, rating: 4.9, category: "electronics", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300&h=200&fit=crop", description: "Ultimate gaming setup with top-tier components." },
    15: { id: 15, name: "Sneakers", price: 29, rating: 4.0, category: "clothing", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=200&fit=crop", description: "Comfortable and stylish sneakers for daily use." },
    16: { id: 16, name: "Data Structures in C++", price: 18, rating: 4.3, category: "books", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=200&fit=crop", description: "In-depth coverage of data structures and algorithms." },
    17: { id: 17, name: "Learn SQL in 24 Hours", price: 22, rating: 4.0, category: "books", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop", description: "Quick and practical SQL learning guide." },
    18: { id: 18, name: "Winter Gloves", price: 75, rating: 4.4, category: "clothing", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop", description: "Warm and durable gloves for winter protection." },
    19: { id: 19, name: "Power Bank", price: 89, rating: 3.7, category: "electronics", image: "https://images.unsplash.com/photo-1609592806598-04d4d2d8b980?w=300&h=200&fit=crop", description: "High-capacity portable charger for all devices." },
    20: { id: 20, name: "Action Camera", price: 249, rating: 4.1, category: "electronics", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=300&h=200&fit=crop", description: "Rugged action camera for adventure photography." },
    21: { id: 21, name: "Summer Dress", price: 65, rating: 4.5, category: "clothing", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=200&fit=crop", description: "Elegant summer dress perfect for any occasion." }
  };

  // --- Product Filtering/Sorting ---
  function filterAndSortProducts() {
    const items = Array.from(productList.querySelectorAll('.product-item'));
    const category = categoryFilter.value;
    const maxPrice = parseFloat(priceFilter.value) || Infinity;
    const sortOption = sortFilter.value;

    let filtered = items.filter(item => {
      const price = parseFloat(item.dataset.price);
      const itemCategory = item.dataset.category;
      return (category === 'all' || itemCategory === category) && price <= maxPrice;
    });

    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => a.dataset.price - b.dataset.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.dataset.price - a.dataset.price);
        break;
      case 'rating-asc':
        filtered.sort((a, b) => a.dataset.rating - b.dataset.rating);
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.dataset.rating - a.dataset.rating);
        break;
    }

    // Animate fade out/in
    productList.style.opacity = 0;
    setTimeout(() => {
      productList.innerHTML = '';
      filtered.forEach((item, i) => {
        item.style.animationDelay = (i * 0.07) + 's';
        productList.appendChild(item);
      });
      productList.style.opacity = 1;
    }, 180);
  }

  [categoryFilter, priceFilter, sortFilter].forEach(el =>
    el.addEventListener('input', filterAndSortProducts)
  );
  filterAndSortProducts();

  // --- Dark Mode ---
  function setDarkMode(on) {
    document.body.classList.toggle('dark-mode', on);
    darkModeToggle.textContent = on ? '☀️' : '🌙';
    localStorage.setItem('productDarkMode', on);
  }
  if (localStorage.getItem('productDarkMode') === 'true') setDarkMode(true);
  darkModeToggle.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('dark-mode'));
  });

  // --- Quantity Controls ---
  function setupQuantityControls() {
    document.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const input = btn.parentElement.querySelector('.qty-input');
        let value = parseInt(input.value);
        
        if (action === 'increase' && value < 99) {
          input.value = value + 1;
        } else if (action === 'decrease' && value > 1) {
          input.value = value - 1;
        }
        
        // Trigger change event
        input.dispatchEvent(new Event('change'));
      });
    });

    document.querySelectorAll('.qty-input').forEach(input => {
      input.addEventListener('change', () => {
        let value = parseInt(input.value);
        if (isNaN(value) || value < 1) input.value = 1;
        if (value > 99) input.value = 99;
      });
    });
  }

  // --- Cart Logic ---
  let cart = JSON.parse(localStorage.getItem('productCart') || '[]');
  
  function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
  
  function updateCartModal() {
    cartItemsList.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
      cartItemsList.innerHTML = '<li style="text-align: center; color: var(--text-light);">Your cart is empty</li>';
    } else {
      cart.forEach((item, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div style="display: flex; align-items: center; gap: 1rem; flex-grow: 1;">
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;">
            <div>
              <div style="font-weight: 600;">${item.name}</div>
              <div style="font-size: 0.9rem; color: var(--text-light);">Qty: ${item.quantity} × $${item.price}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-cart-item" aria-label="Remove from cart" style="background: var(--danger); color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer;">×</button>
          </div>
        `;
        
        li.querySelector('.remove-cart-item').addEventListener('click', () => {
          cart.splice(idx, 1);
          saveCart();
          updateCartModal();
          updateCartCount();
        });
        
        total += Number(item.price * item.quantity);
        cartItemsList.appendChild(li);
      });
    }
    
    cartTotal.textContent = total.toFixed(2);
  }
  
  function saveCart() {
    localStorage.setItem('productCart', JSON.stringify(cart));
  }
  
  function addToCart(productId, quantity = 1) {
    const product = products[productId];
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    saveCart();
    updateCartCount();
    
    // Show success animation
    const cartBtn = document.getElementById('cart-btn');
    cartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => {
      cartBtn.style.transform = 'scale(1)';
    }, 200);
  }

  // --- Event Listeners ---
  cartBtn.addEventListener('click', () => {
    updateCartModal();
    openModal(cartModal);
  });
  
  clearCartBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      cart = [];
      saveCart();
      updateCartCount();
      updateCartModal();
    }
  });
  
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    closeModal(cartModal);
    openCheckoutModal();
  });

  // --- Quick View Modal ---
  let currentProduct = null;
  
  productList.addEventListener('click', e => {
    const quickViewBtn = e.target.closest('.quick-view-btn');
    if (quickViewBtn) {
      e.stopPropagation();
      const productItem = quickViewBtn.closest('.product-item');
      const productId = parseInt(productItem.dataset.id);
      const product = products[productId];
      
      if (product) {
        quickViewDetails.innerHTML = `
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <img src="${product.image}" alt="${product.name}" style="width: 200px; height: 150px; object-fit: cover; border-radius: 12px; margin-bottom: 1rem;">
            <h2 style="margin: 0.5em 0 0.2em 0; color: var(--text);">${product.name}</h2>
            <div style="font-size: 1.5rem; color: var(--primary); font-weight: 700; margin-bottom: 0.5rem;">$${product.price}</div>
            <div style="margin: 0.5em 0; color: var(--text-light);">Category: <b>${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</b></div>
            <div class="rating" style="font-size: 1.1rem; margin-bottom: 1rem;">⭐ ${product.rating}</div>
            <p style="color: var(--text-light); line-height: 1.6;">${product.description}</p>
          </div>
        `;
        currentProduct = { ...product };
        openModal(quickViewModal);
      }
    }
  });
  
  addToCartBtn.addEventListener('click', () => {
    if (currentProduct) {
      const quantity = parseInt(quickViewModal.querySelector('.qty-input').value);
      addToCart(currentProduct.id, quantity);
      closeModal(quickViewModal);
    }
  });

  // --- Add to Cart from Product Cards ---
  productList.addEventListener('click', e => {
    const addToCartBtn = e.target.closest('.add-to-cart-btn');
    if (addToCartBtn) {
      e.stopPropagation();
      const productId = parseInt(addToCartBtn.dataset.productId);
      const productItem = addToCartBtn.closest('.product-item');
      const quantity = parseInt(productItem.querySelector('.qty-input').value);
      addToCart(productId, quantity);
    }
  });

  // --- Checkout Flow ---
  function openCheckoutModal() {
    updateCheckoutSummary();
    openModal(checkoutModal);
  }
  
  function updateCheckoutSummary() {
    const checkoutItems = document.getElementById('checkout-items');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const shippingEl = document.getElementById('checkout-shipping');
    const taxEl = document.getElementById('checkout-tax');
    const totalEl = document.getElementById('checkout-total');
    
    checkoutItems.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;
      
      const div = document.createElement('div');
      div.className = 'checkout-item';
      div.innerHTML = `
        <div>
          <div style="font-weight: 600;">${item.name}</div>
          <div style="font-size: 0.9rem; color: var(--text-light);">Qty: ${item.quantity}</div>
        </div>
        <span>$${itemTotal.toFixed(2)}</span>
      `;
      checkoutItems.appendChild(div);
    });
    
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    shippingEl.textContent = `$${shipping.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  }
  
  placeOrderBtn.addEventListener('click', () => {
    if (validateCheckoutForm()) {
      processOrder();
    }
  });
  
  function validateCheckoutForm() {
    const requiredFields = ['full-name', 'email', 'phone', 'address', 'city', 'zip', 'card-number', 'expiry', 'cvv'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
      const field = document.getElementById(fieldId);
      const value = field.value.trim();
      
      if (!value) {
        field.style.borderColor = 'var(--danger)';
        isValid = false;
      } else {
        field.style.borderColor = '';
      }
    });
    
    // Basic email validation
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      document.getElementById('email').style.borderColor = 'var(--danger)';
      isValid = false;
    }
    
    // Basic card number validation
    const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
    if (cardNumber.length < 13 || cardNumber.length > 19) {
      document.getElementById('card-number').style.borderColor = 'var(--danger)';
      isValid = false;
    }
    
    if (!isValid) {
      alert('Please fill in all required fields correctly.');
    }
    
    return isValid;
  }
  
  function processOrder() {
    // Show loading state
    placeOrderBtn.textContent = 'Processing...';
    placeOrderBtn.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
      // Clear cart
      cart = [];
      saveCart();
      updateCartCount();
      
      // Show success message
      alert('Order placed successfully! Thank you for your purchase.');
      
      // Close modal and reset form
      closeModal(checkoutModal);
      document.getElementById('checkout-form').reset();
      
      // Reset button
      placeOrderBtn.textContent = 'Place Order';
      placeOrderBtn.disabled = false;
    }, 2000);
  }

  // --- Modal Logic ---
  function openModal(modal) {
    modal.hidden = false;
    setTimeout(() => { 
      const focusable = modal.querySelector('input, button, select, textarea');
      if (focusable) focusable.focus();
    }, 50);
    document.body.style.overflow = 'hidden';
  }
  
  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = '';
  }
  
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', e => closeModal(btn.closest('.modal')));
  });
  
  // Close on click outside
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('mousedown', e => {
      if (e.target === modal) closeModal(modal);
    });
  });
  
  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (!quickViewModal.hidden) closeModal(quickViewModal);
      if (!cartModal.hidden) closeModal(cartModal);
      if (!checkoutModal.hidden) closeModal(checkoutModal);
    }
  });

  // --- Initialize ---
  setupQuantityControls();
  updateCartCount();
  
  // Add input formatting for card fields
  const cardNumber = document.getElementById('card-number');
  if (cardNumber) {
    cardNumber.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\s/g, '');
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{4})/g, '$1 ').trim();
      e.target.value = value.substring(0, 19);
    });
  }
  
  const expiry = document.getElementById('expiry');
  if (expiry) {
    expiry.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
      }
      e.target.value = value.substring(0, 5);
    });
  }
  
  const cvv = document.getElementById('cvv');
  if (cvv) {
    cvv.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
    });
  }
});
