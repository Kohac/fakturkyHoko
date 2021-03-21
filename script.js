window.onload = function onLoadHighlight() {
    document.getElementById("basic-settings").classList.add("active-subnav")
    document.getElementsByClassName("basic-settings")[0].style.display = "block";

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
    if (dropwdownContent.style.display === "block") {
        dropwdownContent.style.display = "none"
    }
    else{
        dropwdownContent.style.display = "block";
    }        
}
function filterDropDown() {
    let inputValue = document.getElementById("filter-dropdown");
    let elementSection = document.getElementById("dropdown-content");
    let tr = elementSection.getElementsByTagName("tr");
    for (let index = 1; index < tr.length; index++) {
        txtValue = tr[index].getElementsByTagName("td")[1].textContent;
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