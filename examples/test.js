
function calculateTotal(price, quantity) {
    const subtotal = price * quantity;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    console.log("Subtotal:  ₹" + subtotal);
    console.log("Tax:  ₹" + tax);
    console.log("Total:  ₹" + total);

    return total;
}

function greetUser(name) {
    const greeting = "வணக்கம் " + name + "!";
    const message = "வாழ்க வளமுடன்";

    console.log(greeting);
    console.log(message);

    return {
        greeting: greeting,
        timestamp: Date.now()
    };
}

const result = calculateTotal(10, 5);
const user = greetUser("SMR");

console.log("Final result:", result);