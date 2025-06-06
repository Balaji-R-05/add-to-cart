import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://add-to-cart-c7935-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListinDB = ref(database, "shoppingList");

const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

onValue(shoppingListinDB, function(snapshot) {
    clearShoppingList();
    
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val());
        itemsArray.forEach(item => {
            let currentItemId = item[0];
            let currentItemValue = item[1];

            addElementToShoppingList(item);
        });
    } else {
        shoppingList.innerHTML = "<li>No items yet</li>";
    }
});

addButton.addEventListener("click", function() {
    let inputValue = inputField.value;
    if (inputValue.trim() !== "") {
        push(shoppingListinDB, inputValue);
        clearInputField();
    }
});

function clearInputField() {
    inputField.value = "";
    inputField.focus();
}

function clearShoppingList() {
    shoppingList.innerHTML = "";
}

function addElementToShoppingList(item) {
    // shoppingList.innerHTML += `<li>${inputValue}</li>`;
    const itemID = item[0];
    const itemValue = item[1];

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;
    shoppingList.append(newEl);
    newEl.addEventListener("dblclick", function() {
        let exactLocation = ref(database, `shoppingList/${itemID}`);
        remove(exactLocation);
    })
}
