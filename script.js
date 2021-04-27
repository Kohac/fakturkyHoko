'USE STRICT';
window.onload = function onLoadHighlight() {
    document.getElementById("basic-settings").classList.add("active-subnav")
    document.getElementsByClassName("basic-settings")[0].style.display = "block";
    loadItemsFromApi();

    //training section
    //training section end

}
function addSubNavClass(el) {
    let subnav = document.getElementsByClassName("subnav-ul")[0];
    let a = subnav.getElementsByTagName("a");
    let array = Array.from(a);
    array.forEach(element => {
            element.classList.remove("active-subnav");
        });
    el.classList.toggle("active-subnav");
    displayAndHideSections(el);
}

function displayAndHideSections(item) {
    const hideElements = document.getElementsByClassName("settings");
    const arrayHideElements = Array.from(hideElements);
    arrayHideElements.forEach(el => {
        el.style.display = "none";
    })
    const itemId = item.id;
    const element = document.getElementsByClassName(itemId)[0];
    console.log(element.style.display);
    document.getElementsByClassName(itemId)[0].style.display = "none";
    if (element.style.display === "none") {
        element.style.display = "block";
    } 
    else{
        element.style.display = "none";
    }
}

//dropdown
function dropdownHideOrShowSection(element, toggleLeftName, toggleRightName) {
    element.classList.toggle("focused");
    document.getElementById(toggleRightName).classList.toggle("rotate-right-top");
    document.getElementById(toggleLeftName).classList.toggle("rotate-left-top");
    const dropwdownContent = element.nextElementSibling;
    console.log(dropwdownContent);    
    if (dropwdownContent.style.display === "block") {
        dropwdownContent.style.display = "none"
    }
    else{
        dropwdownContent.style.display = "block";
    }        
}
function filterDropDown(inputId, sectionId, cellIndex) {
    let inputValue = document.getElementById(inputId);
    let elementSection = document.getElementById(sectionId);
    let tr = elementSection.getElementsByTagName("tr");
    for (let index = 1; index < tr.length; index++) {
        txtValue = tr[index].getElementsByTagName("td")[cellIndex].textContent;
        if (txtValue.toUpperCase().indexOf(inputValue.value.toUpperCase()) > -1 ){
            tr[index].style.display = "";
        }
        else{
            tr[index].style.display = "none";
        }
    }
};
//dropdown
//modal
function closeModal(element) {
    element.parentNode.style.display = "none";
}
function modalContent(elementId) {
    let modal = document.getElementById(elementId);
    modal.style.display = "block";
}
//modal
//Load table items
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
function validateItemCreation() {
    // const item = document.getElementById("invoice-item");
    // const itemPriceWithVat = document.getElementById("item-price");
    // const itemVat = document.getElementById("item-vat");
    // if (item.value === "") {
        
    // }
    const itemFormCreationInputs = document.getElementsByClassName("item-creation");
    const errorArray = [];
    for (const itemInput of itemFormCreationInputs) {
        if (itemInput.value === "") {
            console.log(itemInput.previousElementSibling.innerHTML);
            // alert("Vsechny polozky musi byt vyplnene!!!" + itemInput.previousElementSibling.innerHTML);
            // return false;
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
    const item = document.getElementById("invoice-item");
    const itemPriceWithVat = document.getElementById("item-price");
    const itemVat = document.getElementById("item-vat");
    data.productName = item.value;
    data.unitPriceWithVat = itemPriceWithVat.value;
    data.rateVat = itemVat.value;
    insertNewItem(data);
    return true;
}
function clearItemCreationValues() {
    const itemFormCreationInputs = document.getElementsByClassName("item-creation");
    for (const itemInput of itemFormCreationInputs) {
        itemInput.value = null;
    }
}
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
                console.log("Chyba pri vytvoreni polozky");
            }
            clearItemCreationValues();
            response.json()
            .then((parsedData) => {
                console.log(parsedData);
            })
        })
}
function getAllItems(jsonData) {
    const newtable = document.getElementById("table-items");
    let tr = newtable.insertRow(-1);
    
    let listOfKeys = [];

    for (const key in jsonData.items[0]) {
        if (key !== "flags") {
            listOfKeys.push(key);
        }
    }

    for (let i = 0; i < jsonData.items.length; i++) {
        tr = newtable.insertRow(-1);
        for (let a = 0; a < listOfKeys.length; a++) {
            let td = tr.insertCell(-1);
            if (listOfKeys[a] === "itemId") {
                let aTag = document.createElement("a");
                aTag.innerHTML = jsonData.items[i][listOfKeys[a]];
                aTag.addEventListener("click", () => {
                    editItem(jsonData.items[i]);
                });
                td.appendChild(aTag);   
            }
            else{
                td.innerHTML = jsonData.items[i][listOfKeys[a]];
            }
        }
    }
}
function editItem(data) {
    modalContent('edit-item-modal');
    console.log(data);
    const id = document.getElementById("edit-invoice-item-id");
    const itemName = document.getElementById("edit-invoice-item");
    const itemPriceWithVat = document.getElementById("edit-item-price");
    const itemVat = document.getElementById("edit-item-vat");
    const itemUpdate = document.getElementById("item-update");
    const itemDelete = document.getElementById("item-delete");
    
    id.value = data.itemId;
    itemName.value = data.productName;
    itemPriceWithVat.value = data.unitPriceWithVat;
    itemVat.value = data.rateVat;

    let flags = [];
    for (const key in data.flags) {
        flags.push(data.flags[key]);
    }
    for (const flag of flags) {
        console.log(flag);
        if (flag === "deletable") {
            itemDelete.style.display = "block";
        }
        if (flag === "updatable") {
            itemUpdate.style.display = "block";
        }
    }
}

// function loadItemsFromApi() {
//     const url = "http://localhost:9090/api/v1/items";
//     fetch(url, {method: 'POST', mode: 'no-cors'
//     ,headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// })
//         .then((response) => {
//             if (response.status !== 200) {
//                 console.log("Error status: " + response.status);
//                 console.log("response detail: " + response.text());
//             }
//             return response.json();
//         })
//         .catch((error) =>{
//             console.log("Catch: " + error);
//         })
// }
// function loadItemsFromApi(){
//     const conferenceUrl = "https://statsapi.web.nhl.com/api/v1/conferences";
//     fetch(conferenceUrl)
//         .then(function(response){
//             if(response.status !== 200){
//                 console.log("Error occured: ", response.status)    
//                 return;
//             }
//             response.json()
//             .then(function(data){
//                 console.log(data);
//             })
//         }).catch(function(error){
//             console.log("catch: ", error);
//         })
// }

fillItemsToTable = () => {
    const newDiv = document.getElementById("items-list");
    const newTable = document.createElement("table");

}
//Load table items end