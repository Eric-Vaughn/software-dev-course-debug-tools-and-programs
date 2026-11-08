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
	// Make sure the discount rate is a number between 0 & 1
	if (discountRate < 0.0 || discountRate > 1.0) {
		return -1; // Give an impossible value for a bogus discount rate
	}
    return total - total * discountRate; // Bug: Missing validation for discountRate - FIXED
}

function generateReceipt(cartItems, total) {
	// Check if the total is a finite number
	if (!Number.isFinite(total)) return `${total} is not a number.`;

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
 * Validate Fixes
 */

// TODO:
// VALIDATE

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
 * Found an TypeError:
 * The user has to input a discount rate, so we need to validate that it's a valid discount rate between 0 & 1
 * 
 * Fix by checking if the discount rate is between 0 & 1, inclusive
 * 
 * Found a TyperError:
 * If the user inputs a total that is not a number, then the generateReceipt() function can't use the .toFixed() method on it.
 * 
 * Fix by checking if total is a number. If not, early return.
 *
 */
