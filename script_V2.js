'USE STRICT';
document.addEventListener("DOMContentLoaded", function() {
    // getAllItems(getApiCall("http://localhost:9090/api/v1/items"));
    // const postItem = postApiCall("http://localhost:9090/api/v1/items");
    // const putItem = putApiCall("http://localhost:9090/api/v1/items/");
    // const deleteItem = deleteApiCall("http://localhost:9090/api/v1/items/");
    const data = getApiCall("http://localhost:9090/api/v1/items");
    console.log(data);
    console.log(JSON.stringify(data))
    // console.log(data.json());
});

// async function getApiCall(url) {
//     // const url = "http://localhost:9090/api/v1/items";
//     {return await fetch(url, {method: 'GET'})
//         .then((response) => {
//             if (response.status !== 200) {
//                 console.log("Error status: " + response.status);
//                 console.log("response detail: " + response.text());
//                 return;
//             }
//             response.json()
//             .then((data) => {
//                 // getAllItems(data); 
//                 console.log("asdea"); 
//                 console.log(data); 
//                 return data; 
//             })
//         })
//         .catch((error) =>{
//             alert("Catch: " + error);
//         })
//     }
// }
async function getApiCall(url) { 
    return await fetch(url, {method: 'GET'})
    .then((response) => response.json()); 
}
function postApiCall(url, data) {
    // const url = "http://localhost:9090/api/v1/items";
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(url,options)
        .then((response) => {
            if (response.status !== 201) {
                alert("Chyba pri vytvoreni polozky");
            }
            response.json()
            .then((parsedData) => {
                // closeModal();
                alert("Položka faktury byla úspěšně vytvořena!!!");
                return parsedData;
                // reloadItemTable();
            })
        }).catch((error) => {
            alert("Chyba při založení položky." + error);
        })
}
function putApiCall(url ,data, itemId) {
    // const url = "http://localhost:9090/api/v1/items/" + itemId;
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(url,options)
        .then((response) => {
            console.log(response);
            console.log(response.status);
            response.json()
            .then((parsedData) => {
                // console.log(parsedData);
                // closeModal()
                alert("Položka faktury byla úspěšně aktualizována!!!");
                // reloadTable();
                return parsedData;
            })
        })
}
function deleteApiCall(url, itemId) {
    // const url = "http://localhost:9090/api/v1/items/" + itemId;
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(url,options)
        .then((response) => {
            // console.log(response.status);
            alert("Položka faktury: byla odstraněna");
            return response;
            // reloadTable();
        })
        .catch((error) =>{
            alert("Objevila se neočekávaná chyba " + error + ", kontaktujte náš service desk.");
        })
}
//API call section
// function loadItemsFromApi() {
//     const url = "http://localhost:9090/api/v1/items";
//     fetch(url, {method: 'GET'})
//         .then((response) => {
//             if (response.status !== 200) {
//                 console.log("Error status: " + response.status);
//                 console.log("response detail: " + response.text());
//                 return;
//             }
//             response.json()
//             .then((data) => {
//                 getAllItems(data);
//                 return data;
//             })
//         })
//         .catch((error) =>{
//             alert("Catch: " + error);
//         })
// }
// function insertNewItem(data) {
//     const url = "http://localhost:9090/api/v1/items";
//     const options = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     };
//     fetch(url,options)
//         .then((response) => {
//             if (response.status !== 201) {
//                 alert("Chyba pri vytvoreni polozky");
//             }
//             response.json()
//             .then((parsedData) => {
//                 console.log(parsedData);
//                 closeModal();
//                 alert("Položka faktury byla úspěšně vytvořena!!!");
//                 reloadItemTable();
//             })
//         })
// }
// function updateItem(data, itemId) {
//     const url = "http://localhost:9090/api/v1/items/" + itemId;
//     const options = {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data)
//     };
//     fetch(url,options)
//         .then((response) => {
//             console.log(response);
//             console.log(response.status);
//             response.json()
//             .then((parsedData) => {
//                 console.log(parsedData);
//                 closeModal()
//                 alert("Položka faktury byla úspěšně aktualizována!!!");
//                 reloadTable();
//             })
//         })
// }
// function deleteItem(itemId, itemName) {
//     const url = "http://localhost:9090/api/v1/items/" + itemId;
//     const options = {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     };
//     fetch(url,options)
//         .then((response) => {
//             console.log(response.status);
//             alert("Položka faktury: byla odstraněna");
//             reloadTable();
//         })
//         .catch((error) =>{
//             alert("Objevila se neočekávaná chyba " + error + ", kontaktujte náš service desk.");
//         })
// }


//get item section

function createItem() {
    let arrayOfInputLabels = new Array();
    arrayOfInputLabels.push("Položka faktury");
    arrayOfInputLabels.push("Cena položky s DPH");
    arrayOfInputLabels.push("Sazba DPH");

    const modal = document.getElementById("modal-content");
    const h3 = document.createElement("h3");
    h3.classList.add("text-center");
    h3.classList.add("l");
    h3.classList.add("m-modal");
    h3.classList.add("modal-title");
    h3.innerHTML = "Vytvořit položku faktury";
    modal.appendChild(h3);

    for (const key in arrayOfInputLabels) {
        if (key !== "flags") {
            let inputId = translateMap(arrayOfInputLabels[key]);
            let newDiv = document.createElement("div");
            newDiv.classList.add("flex");
            let label = document.createElement("label");
            label.htmlFor = inputId;
            label.innerHTML = arrayOfInputLabels[key];
            let input = document.createElement("input");
            input.setAttribute("type","text")
            input.required = true;
            input.id = inputId;
            input.classList.add("item-creation");
            input.placeholder = arrayOfInputLabels[key];
            newDiv.appendChild(label);
            newDiv.appendChild(input);
            modal.appendChild(newDiv);
        }
    }

    const button = document.createElement("input");
    button.setAttribute("type", "submit");
    button.classList.add("btn-edit");
    button.value = "Vytvořit položku";
    button.addEventListener('click', () => {
        if(validateItemCreation()){
            insertItem();
        }
        else{
            alert("Vsechny polozky musi byt vyplnene!!! \n" + errorArray.toString());
        }
    });
    modal.appendChild(button);

    openModal("modal");
}
function editItem(data) {
    console.log(data);
    const modal = document.getElementById("modal-content");
    const h3 = document.createElement("h3");
    h3.classList.add("text-center");
    h3.classList.add("l");
    h3.classList.add("m-modal");
    h3.classList.add("modal-title");
    h3.innerHTML = "Upravit položku faktury";
    modal.appendChild(h3);

    for (const key in data) {
        if (key !== "flags") {
            let newDiv = document.createElement("div");
            newDiv.classList.add("flex");
            let label = document.createElement("label");
            label.htmlFor = key;
            label.innerHTML = translateMap(key);
            let input = document.createElement("input");
            input.setAttribute("type","text")
            input.required = true;
            input.id = key;
            input.classList.add("item-update");
            input.value = data[key];
            if (key === "itemId") {
                input.readOnly = true;
            }
            newDiv.appendChild(label);
            newDiv.appendChild(input);
            modal.appendChild(newDiv);
        }
    }

    const button = document.createElement("input");
    button.setAttribute("type", "submit");
    button.classList.add("btn-edit");
    button.value = "Upravit položku";
    button.addEventListener('click', () => {
        validateItemUpdate();
    });
    modal.appendChild(button);

    openModal("modal");
}
function translateMap(stringKey) {
    const map = new Map();
    map.set("itemId", "Číslo položky faktury");
    map.set("productName", "Položka faktury");
    map.set("unitPriceWithVat", "Cena položky s DPH");
    map.set("rateVat", "Sazba DPH");
    map.set("Číslo položky faktury", "itemId");
    map.set("Položka faktury", "productName");
    map.set("Cena položky s DPH", "unitPriceWithVat");
    map.set("Sazba DPH", "rateVat");
    return map.get(stringKey);
}
// end get item section
//insert item section
function validateItemCreation() {
    const itemFormCreationInputs = document.getElementsByClassName("item-creation");
    const errorArray = [];
    for (const itemInput of itemFormCreationInputs) {
        if (itemInput.value === "") {
            console.log(itemInput.previousElementSibling.innerHTML);
            errorArray.push(itemInput.previousElementSibling.innerHTML);
        }
    }
    if (errorArray.length > 0) {
        return false;
    }
    return true;
}
function insertItem() {
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
    postApiCall("http://localhost:9090/api/v1/items", data)
}

//insert item section
//delete item section

//delete item section
//update item section
function validateItemUpdate() {
    const itemFormCreationInputs = document.getElementsByClassName("item-update");
    const errorArray = [];
    for (const itemInput of itemFormCreationInputs) {
        if (itemInput.value === "") {
            console.log(itemInput.previousElementSibling.innerHTML);
            errorArray.push(itemInput.previousElementSibling.innerHTML);
        }
    }
    if (errorArray.length > 0) {
        alert("Vsechny polozky musi byt vyplnene!!! \n" + errorArray.toString());
        return false;
    }
    const data = {
        productName: "",
        unitPriceWithVat: "",
        rateVat: ""
    }
    const itemId = document.getElementById("itemId");
    const item = document.getElementById("productName");
    const itemPriceWithVat = document.getElementById("unitPriceWithVat");
    const itemVat = document.getElementById("rateVat");
    data.productName = item.value;
    data.unitPriceWithVat = itemPriceWithVat.value;
    data.rateVat = itemVat.value;
    updateItem(data, itemId.value);
    return true;
}
//update item section
function clearModalContent() {
    const modal = document.getElementById("modal-content");
    while (modal.firstChild) {
        modal.removeChild(modal.firstChild);
    }
}
function reloadItemTable() {
    const table = document.getElementById("table-items");
    while (table.rows.length > 1) {
        console.log(table.rows.length);
        table.deleteRow(1);
    }
    loadItemsFromApi();
}
function openModal(modalId){
    const modal = document.getElementById(modalId)
    modal.style.display = "block";
}
function closeModal(){
    clearModalContent();
    document.getElementById("modal").style.display = "none";
}