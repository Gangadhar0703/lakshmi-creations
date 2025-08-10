// --- Load existing cart from localStorage or create a new one ---
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update cart count in .cart element
function updateCartCount() {
    const cartElement = document.querySelector(".cart");
    if (cartElement) {
        cartElement.textContent = `Cart (${cart.length})`;
    }
}

// Add product to cart
function addToCart(productName, price) {
    // Push new product into the cart array
    cart.push({ name: productName, price: price });

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Optional alert
    alert(`${productName} has been added to your cart!`);
}

// Attach event listeners to all Add to Cart buttons
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();

    // Get all add-to-cart buttons
    const buttons = document.querySelectorAll(".cartbtn");

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            // Read product details from attributes or nearby HTML
            let productName = this.getAttribute("data-name") || this.dataset.name;
            let price = parseFloat(this.getAttribute("data-price")) || 0;

            if (!productName) {
                // If not set via data attributes, try reading from nearby element
                let parent = this.closest(".lotus, .swan, .arch");
                if (parent) {
                    let nameElement = parent.querySelector(".names");
                    let priceElement = parent.querySelector(".price1, .price2, .price3");
                    if (nameElement) productName = nameElement.textContent.trim();
                    if (priceElement) price = parseFloat(priceElement.textContent.replace(/[^0-9.]/g, ""));
                }
            }

            addToCart(productName, price);
        });
    });
});
