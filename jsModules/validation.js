import * as api from './apiCall.js';
import * as modals from './modals.js';
import * as utils from './utils.js';
export function validateItemCreation() {
    const itemFormCreationInputs = document.getElementsByClassName("item-creation");
    const errorArray = [];
    for (const itemInput of itemFormCreationInputs) {
        if (itemInput.value === "") {
            // console.log(itemInput.previousElementSibling.innerHTML);
            errorArray.push(itemInput.previousElementSibling.innerHTML);
        }
    }
    if (errorArray.length > 0) {
        alert("Následující položky musí být vyplněny! \n" + errorArray.toString());
        return false;
    }
    return true;
}
export function validateItemUpdate() {
    const itemFormCreationInputs = document.getElementsByClassName("item-update");
    const errorArray = [];
    for (const itemInput of itemFormCreationInputs) {
        if (itemInput.value === "") {
            console.log(itemInput.previousElementSibling.innerHTML);
            errorArray.push(itemInput.previousElementSibling.innerHTML);
        }
    }
    if (errorArray.length > 0) {
        alert("Následující položky musí být vyplněny! \n" + errorArray.toString());
        return false;
    }
    return true;
}
export function insertItem() {
    const data = {
        productName: "",
        unitPriceWithVat: "",
        rateVat: ""
    }
    const item = document.getElementById("productName");
    const itemPriceWithVat = document.getElementById("unitPriceWithVat");
    const itemVat = document.getElementById("rateVat");
    data.productName = item.value;
    data.unitPriceWithVat = itemPriceWithVat.value;
    data.rateVat = itemVat.value;
    const callPost = api.postApiCall("http://localhost:9090/api/v1/items", data);
    callPost.then(
        (value) => {
            console.log(value);
            modals.closeModal();
            utils.reloadItemTable();
            alert("Položka byla úspěšně vytvořena!");
        },
        (error) => {
            alert("Objevila se chyba." + error);
        }
    )
}
export function updateItem() {
    const data = {
        productName: "",
        unitPriceWithVat: "",
        rateVat: ""
    }
    const itemId = document.getElementById("itemId").value;
    const item = document.getElementById("productName");
    const itemPriceWithVat = document.getElementById("unitPriceWithVat");
    const itemVat = document.getElementById("rateVat");
    data.productName = item.value;
    data.unitPriceWithVat = itemPriceWithVat.value;
    data.rateVat = itemVat.value;
    const callPost = api.putApiCall("http://localhost:9090/api/v1/items/" + itemId, data);
    callPost.then(
        (value) => {
            console.log(value);
            modals.closeModal();
            utils.reloadItemTable();
            alert("Položka byla úspěšně aktualizována!");
        },
        (error) => {
            alert("Objevila se chyba." + error);
        }
    )
}
export function deleteItem(itemId) {
    api.deleteApiCall("http://localhost:9090/api/v1/items/" + itemId);
    utils.reloadItemTable();
}