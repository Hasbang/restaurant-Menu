// sample menu data
const menuItems = [
    { name: "margarita pizza", description: "Classic pizza with cheese and tomato", price: "LE100"},
    { name: "Spagheti carbonara", description: "creamy pasta with bacon", price: "LE120"},
    { name: "Caeser Salad", description: "fresh romaine with caeser dressing", price: "LE80"},
];

// Render menu

const menuContainer = document.querySelector("#menu-container");

menuItems.forEach(item =>{
    const div = document.createElement("div");
    div.className = "menu-item";
    div.innerHTML = `
    <h3> ${item.name} </h3>
    <p>${item.description}</p>
    <strong>${item.price} </strong>
    `;
    menuContainer.appendChild(div)
})