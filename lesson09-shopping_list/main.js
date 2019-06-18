let items = [];

// re-render all our shopping items
function render() {
    let shoppingListElement = document.getElementById("shoppingList");

    // first, remove all the old elements
    shoppingListElement.innerHTML = "";

    // for every shopping item, create one new <li> element.
    for (let item of items) {
        let liElement = document.createElement("li");
        liElement.textContent = item.name;
        if (item.done === true) {
            liElement.style.textDecoration = "line-through";
        }
        liElement.onclick = function() {
            item.done = true;
            render();
        }
        shoppingListElement.appendChild(liElement);
    }
}

function addButtonClicked() {
    let shoppingItemElement = document.getElementById("shoppingItem");
    let newItem = shoppingItemElement.value;

    // don't allow empty items
    if (newItem === "") {
        return;
    }

    // don't allow duplicate items
    for (let item of items) {
        if (item.name === newItem) {
            return;
        }
    }

    // finally, add the item to our array, and render them
    items.push({ name: newItem, done: false });
    render();
}
