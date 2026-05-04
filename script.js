// Data for Products
const products = [
    {
        id: 1,
        name: "Hydrating Hyaluronic Serum",
        price: 3600,
        rating: 4.8,
        type: "Dry",
        concern: "Dullness",
        image: "images/serum_bottle.png",
        benefits: "Deeply hydrates and plumps the skin.",
        ingredients: "Hyaluronic Acid, Vitamin B5, Water",
        usage: "Apply 2-3 drops to damp skin morning and night.",
        suitability: "Great for dry and dehydrated skin.",
        reviews: [
            { user: "Emily R.", comment: "My skin has never felt softer!" },
            { user: "John D.", comment: "Excellent hydration without stickiness." }
        ]
    },
    {
        id: 2,
        name: "Purifying Clay Mask",
        price: 2800,
        rating: 4.6,
        type: "Oily",
        concern: "Acne",
        image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=800&auto=format&fit=crop",
        benefits: "Draws out impurities and minimizes pores.",
        ingredients: "Kaolin Clay, Bentonite, Green Tea Extract",
        usage: "Apply an even layer to clean skin. Leave for 10 mins, rinse.",
        suitability: "Ideal for oily and acne-prone skin.",
        reviews: [
            { user: "Sarah K.", comment: "Cleared up my breakouts fast." }
        ]
    },
    {
        id: 3,
        name: "Restorative Night Cream",
        price: 5200,
        rating: 4.9,
        type: "Dry",
        concern: "Wrinkles",
        image: "images/moisturizer_cream.png",
        benefits: "Repairs skin barrier and reduces fine lines while you sleep.",
        ingredients: "Peptides, Ceramides, Shea Butter",
        usage: "Massage into face and neck as the last step of night routine.",
        suitability: "Perfect for aging or very dry skin.",
        reviews: [
            { user: "Linda P.", comment: "I wake up glowing!" }
        ]
    },
    {
        id: 4,
        name: "Gentle Soothing Cleanser",
        price: 2200,
        rating: 4.7,
        type: "Sensitive",
        concern: "Redness",
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800&auto=format&fit=crop",
        benefits: "Cleanses without stripping natural oils. Calms redness.",
        ingredients: "Aloe Vera, Chamomile, Oat Extract",
        usage: "Massage onto wet skin, rinse with lukewarm water.",
        suitability: "Safe for sensitive and rosacea-prone skin.",
        reviews: [
            { user: "Mike T.", comment: "The only cleanser that doesn't burn." }
        ]
    },
    {
        id: 5,
        name: "Brightening Vitamin C Serum",
        price: 4400,
        rating: 4.8,
        type: "Combination",
        concern: "Dark spots",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
        benefits: "Fades dark spots and evens skin tone.",
        ingredients: "15% L-Ascorbic Acid, Ferulic Acid, Vitamin E",
        usage: "Apply 3 drops in the morning before sunscreen.",
        suitability: "Suitable for most skin types except very sensitive.",
        reviews: [
            { user: "Ana C.", comment: "Faded my hyperpigmentation significantly." }
        ]
    },
    {
        id: 6,
        name: "Balancing Gel Moisturizer",
        price: 3300,
        rating: 4.5,
        type: "Oily",
        concern: "Dullness",
        image: "images/balancing_gel.png",
        benefits: "Provides lightweight hydration without clogging pores.",
        ingredients: "Niacinamide, Squalane, Watermelon Extract",
        usage: "Apply daily after cleansing and serums.",
        suitability: "Ideal for oily and combination skin.",
        reviews: [
            { user: "Chris M.", comment: "Sinks right in, no greasy residue." }
        ]
    }
];

// Navigation Logic
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if(link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
    window.scrollTo(0,0);
    
    // Close mobile menu if open
    document.querySelector('.nav-links').classList.remove('active');
}

// Event Listeners for Nav
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = e.target.getAttribute('data-page');
        navigateTo(pageId);
    });
});

// Mobile Menu Toggle
document.querySelector('.hamburger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if(theme === 'dark') {
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
    } else {
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
    }
}

themeToggle.addEventListener('click', () => {
    let currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(targetTheme);
});

// Initialize Theme
let savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);


// Product Rendering
function createProductCard(product) {
    return `
        <div class="product-card glass" onclick="openProductModal(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <div class="product-tags">
                    <span class="tag">${product.type}</span>
                    <span class="tag">${product.concern}</span>
                </div>
                <h3>${product.name}</h3>
                <p class="price">₹${product.price}</p>
                <button class="btn btn-primary full-width">View Details</button>
            </div>
        </div>
    `;
}

function renderProducts(containerId, productList) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = productList.map(p => createProductCard(p)).join('');
}

// Render Highlights on Home Page
renderProducts('highlight-products', products.slice(0, 3));

// Render All Products on Products Page
renderProducts('all-products', products);

// Filtering Logic
const filterType = document.getElementById('filter-type');
const filterConcern = document.getElementById('filter-concern');
const filterPrice = document.getElementById('filter-price');
const priceVal = document.getElementById('price-val');

function applyFilters() {
    let type = filterType.value;
    let concern = filterConcern.value;
    let maxPrice = parseInt(filterPrice.value);
    
    priceVal.innerText = '₹' + maxPrice;

    let filtered = products.filter(p => {
        let matchType = type === 'All' || p.type === type;
        let matchConcern = concern === 'All' || p.concern === concern;
        let matchPrice = p.price <= maxPrice;
        return matchType && matchConcern && matchPrice;
    });

    renderProducts('all-products', filtered);
}

if(filterType && filterConcern && filterPrice) {
    filterType.addEventListener('change', applyFilters);
    filterConcern.addEventListener('change', applyFilters);
    filterPrice.addEventListener('input', applyFilters);
}

// Product Modal Logic
const modal = document.getElementById('product-modal');
const closeBtn = document.querySelector('.close-btn');

function openProductModal(id) {
    const p = products.find(prod => prod.id === id);
    if(!p) return;

    let reviewsHtml = p.reviews.map(r => `<p><strong>${r.user}:</strong> ${r.comment}</p>`).join('');

    const content = `
        <div class="modal-grid">
            <div>
                <img src="${p.image}" alt="${p.name}" class="modal-img">
            </div>
            <div class="modal-info">
                <h2>${p.name}</h2>
                <div class="product-tags">
                    <span class="tag">${p.type} Skin</span>
                    <span class="tag">For ${p.concern}</span>
                    <span class="tag">★ ${p.rating}</span>
                </div>
                <div class="modal-price">₹${p.price}</div>
                <p>${p.benefits}</p>
                
                <div class="modal-section mt-4">
                    <h4>Ingredients</h4>
                    <p>${p.ingredients}</p>
                </div>
                <div class="modal-section">
                    <h4>How to Use</h4>
                    <p>${p.usage}</p>
                </div>
                <div class="modal-section">
                    <h4>Suitability</h4>
                    <p>${p.suitability}</p>
                </div>
                
                <button class="btn btn-primary full-width mt-4" onclick="addToCart(${p.id})">Add to Cart - ₹${p.price}</button>
                
                <div class="modal-section mt-4">
                    <h4>Customer Reviews</h4>
                    ${reviewsHtml}
                </div>
            </div>
        </div>
    `;

    document.getElementById('modal-details').innerHTML = content;
    modal.classList.add('show');
}

if(closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
    const cartModal = document.getElementById('cart-modal');
    if (e.target === cartModal) {
        cartModal.classList.remove('show');
    }
});

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(id) {
    const p = products.find(prod => prod.id === id);
    if(!p) return;
    
    let existingItem = cart.find(item => item.id === id);
    if(existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...p, qty: 1 });
    }
    
    updateCart();
    modal.classList.remove('show');
    openCartModal();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update count
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const countBadge = document.getElementById('cart-count');
    if (countBadge) countBadge.innerText = count;
    
    // Render items
    const cartItemsContainer = document.getElementById('cart-items');
    if(!cartItemsContainer) return;

    const checkoutContainer = document.getElementById('checkout-form-container');
    const checkoutBtn = document.getElementById('checkout-btn');

    if(cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        document.getElementById('cart-total').innerText = '₹0';
        if(checkoutContainer) checkoutContainer.classList.add('hidden');
        if(checkoutBtn) checkoutBtn.innerText = 'Proceed to Checkout';
        return;
    }
    
    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        total += item.price * item.qty;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-qty-controls">
                        <button class="cart-qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="cart-qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                    </div>
                </div>
                <div class="cart-item-price">₹${item.price * item.qty}</div>
                <button class="cart-remove-btn" onclick="removeFromCart(${item.id})">&times;</button>
            </div>
        `;
    }).join('');
    
    document.getElementById('cart-total').innerText = '₹' + total;
    if(checkoutContainer && !checkoutContainer.classList.contains('hidden')) {
        checkoutBtn.innerText = 'Confirm Order - ₹' + total;
    }
}

function changeQty(id, delta) {
    let item = cart.find(i => i.id === id);
    if(item) {
        item.qty += delta;
        if(item.qty <= 0) {
            removeFromCart(id);
        } else {
            updateCart();
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}

function checkout() {
    if(cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    const checkoutContainer = document.getElementById('checkout-form-container');
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (checkoutContainer.classList.contains('hidden')) {
        checkoutContainer.classList.remove('hidden');
        checkoutBtn.innerText = 'Confirm Order - ' + document.getElementById('cart-total').innerText;
        checkoutContainer.scrollIntoView({ behavior: 'smooth' });
    } else {
        if(checkoutForm.checkValidity()) {
            const name = document.getElementById('checkout-name').value;
            alert(`Thank you, ${name}! Your order has been placed successfully.\nTotal amount: ` + document.getElementById('cart-total').innerText);
            
            cart = [];
            updateCart();
            checkoutForm.reset();
            checkoutContainer.classList.add('hidden');
            checkoutBtn.innerText = 'Proceed to Checkout';
            document.getElementById('cart-modal').classList.remove('show');
        } else {
            checkoutForm.reportValidity();
        }
    }
}

// Cart Modal Toggle
const cartModal = document.getElementById('cart-modal');
const cartToggle = document.getElementById('cart-toggle');
const closeCartBtn = document.getElementById('close-cart');

if (cartToggle) {
    cartToggle.addEventListener('click', () => {
        openCartModal();
    });
}
if (closeCartBtn) {
    closeCartBtn.addEventListener('click', () => {
        if(cartModal) cartModal.classList.remove('show');
    });
}

function openCartModal() {
    updateCart();
    if(cartModal) cartModal.classList.add('show');
}

// Update UI on load
updateCart();

// Skin Analysis Logic
const analysisForm = document.getElementById('skin-analysis-form');
const formContainer = document.getElementById('analysis-form-container');
const resultsContainer = document.getElementById('analysis-results');

if(analysisForm) {
    analysisForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get values
        const formData = new FormData(analysisForm);
        const skinType = formData.get('skin_type');
        const concern = formData.get('concern');
        const age = formData.get('age');

        // Save to localStorage
        const profile = { skinType, concern, age };
        localStorage.setItem('skinProfile', JSON.stringify(profile));

        displayAnalysisResults(profile);
    });
}

function displayAnalysisResults(profile) {
    // Hide form, show results
    formContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');

    // Populate summary
    document.getElementById('res-type').innerText = profile.skinType;
    document.getElementById('res-concern').innerText = profile.concern;
    document.getElementById('res-age').innerText = profile.age;

    // Generate routine
    let routine = [];
    routine.push("Gentle Cleansing: To keep skin clean without irritation.");
    
    if(profile.skinType === 'Oily') {
        routine.push("Exfoliation (2x/week): BHA to unclog pores.");
        routine.push("Lightweight Gel Moisturizer: Hydration without excess shine.");
    } else if (profile.skinType === 'Dry') {
        routine.push("Hydrating Serum: Hyaluronic acid for deep moisture.");
        routine.push("Rich Ceramide Cream: To repair the skin barrier.");
    } else {
        routine.push("Balanced Hydration: Serum and lotion to maintain equilibrium.");
    }

    if(profile.concern === 'Acne') {
        routine.push("Targeted Treatment: Salicylic acid or Benzoyl Peroxide on spots.");
    } else if (profile.concern === 'Wrinkles') {
        routine.push("Anti-aging Active: Retinol or Peptides at night.");
    } else if (profile.concern === 'Dark spots') {
        routine.push("Brightening Serum: Vitamin C in the morning.");
    }

    routine.push("Sun Protection: Broad-spectrum SPF 30+ every morning.");

    document.getElementById('res-routine').innerHTML = routine.map(step => `<li>${step}</li>`).join('');

    // Match products
    let matched = products.filter(p => p.type === profile.skinType || p.concern === profile.concern);
    // If not enough matches, add some generic good ones
    if(matched.length < 3) {
        matched = [...matched, products.find(p => p.id === 1), products.find(p => p.id === 4)];
        // remove duplicates (by ID)
        matched = matched.filter((v,i,a)=>a.findIndex(v2=>(v2.id===v.id))===i);
    }

    renderProducts('matched-products', matched.slice(0, 3));
}

function resetAnalysis() {
    localStorage.removeItem('skinProfile');
    analysisForm.reset();
    resultsContainer.classList.add('hidden');
    formContainer.classList.remove('hidden');
}

// Check for saved profile on load
const savedProfile = localStorage.getItem('skinProfile');
if(savedProfile) {
    displayAnalysisResults(JSON.parse(savedProfile));
}

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thank you for your message. Our team will get back to you shortly!");
        contactForm.reset();
    });
}

const contactFormHome = document.getElementById('contact-form-home');
if(contactFormHome) {
    contactFormHome.addEventListener('submit', (e) => {
        e.preventDefault();
        alert("Thank you for your message. Our team will get back to you shortly!");
        contactFormHome.reset();
    });
}
