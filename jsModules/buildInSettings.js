import * as modals from './modals.js';
import * as utils from './utils.js';
import * as validation from './validation.js';
export function createTableItems(jsonData) {
    console.log(jsonData);
    const newtable = document.getElementById("table-items");
    let tr = newtable.insertRow(-1);
    let listOfKeys = [];
    for (const key in jsonData.items[0]) {
        listOfKeys.push(key);
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
                            createModalEditItem(jsonData.items[i]);
                        })
                        td.appendChild(icon);
                    }
                    if (flag === "deletable") {
                        let icon = document.createElement("i");
                        icon.classList.add("icon");
                        icon.id = "delete-item-i";
                        td.classList.add("flex-icon");
                        icon.addEventListener('click', () => {
                            if(confirm("Opravdu chceš tuto položku odstranit?")){
                                validation.deleteItem(jsonData.items[i].itemId);
                            }
                        });
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
export function createModalCreateItem() {
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
            let inputId = utils.translateMap(arrayOfInputLabels[key]);
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
        if(validation.validateItemCreation()){
            validation.insertItem();
        }
        else{
            alert("Vsechny polozky musi byt vyplnene!!! \n" + errorArray.toString());
        }
    });
    modal.appendChild(button);

    modals.openModal("modal");
}
export function createModalEditItem(data) {
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
            label.innerHTML = utils.translateMap(key);
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
        if (validation.validateItemUpdate()) {
            validation.updateItem();
        }
        else{
            alert("Vsechny polozky musi byt vyplnene!!! \n" + errorArray.toString());
        }
    });
    modal.appendChild(button);
    modals.openModal("modal");
}