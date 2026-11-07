const cart = [
    { name: "Laptop", price: 1000 },
    { name: "Phone", price: 500 },
    { name: "Headphones", price: 200 },
];

function calculateTotal(cartItems) {
    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
        // Bug: <= should be <
        total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration - FIXED
    }
    return total;
}

function applyDiscount(total, discountRate) {
    return total - total * discountRate; // Bug: Missing validation for discountRate
}

function generateReceipt(cartItems, total) {
    let receipt = "Items:\n";
    cartItems.forEach((item) => {
        receipt += `${item.name}: $${item.price}\n`;
    });
    receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number
    return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;

/**
 * Document Errors
 * 
 * Found a TypeError:
 * TypeError: Cannot read properties of undefined (reading 'price')
 * at calculateTotal (cart.js:10:29) 
 * at cart.js:30:15
 * 
 * Fix by correcting our loop conditional (it was going 1 too many)
 * 
 */
