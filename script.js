window.onload = function onLoadHighlight() {
    document.getElementById("basic-settings").classList.add("active-subnav")
    document.getElementsByClassName("basic-settings")[0].style.display = "block";
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
        // el.style.transform  = "translateX(200%)";
        el.style.display = "none";
    })
    const itemId = item.id;
    const element = document.getElementsByClassName(itemId)[0];
    console.log(element.style.display);
    document.getElementsByClassName(itemId)[0].style.display = "none";
    if (element.style.display === "none") {
        element.style.display = "block";
        // element.style.opacity = 1;
    } 
    else{
        console.log("I am in else");
        element.style.display = "none";
    }
    // document.getElementsByClassName(itemId)[0].style.display = "none";
    // item.id.style.display = "none";
}