'USE STRICT';
window.onload = function(){
    loadItemsFromApi();
}
//get item section
function loadItemsFromApi() {
    const url = "http://localhost:9090/api/v1/items";
    fetch(url, {method: 'GET'})
        .then((response) => {
            if (response.status !== 200) {
                console.log("Error status: " + response.status);
                console.log("response detail: " + response.text());
                return;
            }
            response.json()
            .then((data) => {
                getAllItems(data);
                return data;
            })
        })
        .catch((error) =>{
            console.log("Catch: " + error);
        })
}
function getAllItems(jsonData) {
    const newtable = document.getElementById("table-items");
    let tr = newtable.insertRow(-1);
    
    let listOfKeys = [];

    for (const key in jsonData.items[0]) {
        // if (key !== "flags") {
            listOfKeys.push(key);
        // }
    }

    for (let i = 0; i < jsonData.items.length; i++) {
        tr = newtable.insertRow(-1);
        for (let a = 0; a < listOfKeys.length; a++) {
            let td = tr.insertCell(-1);
            if (listOfKeys[a] === "flags") {
                for (const flag of jsonData.items[i][listOfKeys[a]]) {
                    if (flag === "updatable") {
                        let icon = document.createElement("i");
                        icon.classList.add("icon");
                        icon.id = "update-item-i";
                        td.classList.add("flex-icon");
                        icon.addEventListener('click', () => {
                            editItem(jsonData.items[i]);
                        })
                        td.appendChild(icon);
                    }
                    if (flag === "deletable") {
                        let icon = document.createElement("i");
                        icon.classList.add("icon");
                        icon.id = "delete-item-i";
                        td.classList.add("flex-icon");
                        td.appendChild(icon);
                    }
                }  
            }
            else{
                td.innerHTML = jsonData.items[i][listOfKeys[a]];
            }
        }
    }
}
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
            let newDiv = document.createElement("div");
            newDiv.classList.add("flex");
            let label = document.createElement("label");
            label.htmlFor = key;
            label.innerHTML = arrayOfInputLabels[key];
            let input = document.createElement("input");
            input.setAttribute("type","text")
            input.required = true;
            input.id = key;
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
            input.value = data[key];
            if (key === "itemId") {
                input.disabled = true;
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
    modal.appendChild(button);

    openModal("modal");
}
function translateMap(stringKey) {
    const map = new Map();
    map.set("itemId", "Číslo položky faktury");
    map.set("productName", "Položka faktury");
    map.set("unitPriceWithVat", "Cena položky s DPH");
    map.set("rateVat", "Sazba DPH");
    return map.get(stringKey);
}
// end get item section
//insert item section
function insertNewItem(data) {
    const url = "http://localhost:9090/api/v1/items";
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
            clearItemCreationValues();
            response.json()
            .then((parsedData) => {
                console.log(parsedData);
            })
        })
}
//insert item section
function clearModalContent() {
    const modal = document.getElementById("modal-content");
    while (modal.firstChild) {
        modal.removeChild(modal.firstChild);
    }
}
function openModal(modalId){
    const modal = document.getElementById(modalId)
    modal.style.display = "block";
}
function closeModal(){
    clearModalContent();
    document.getElementById("modal").style.display = "none";
}