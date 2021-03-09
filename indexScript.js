window.onload = function hideAndShowElements() {
    document.getElementsByClassName("create-invoice")[0].style.display = "none";
    var select = document.getElementsByClassName("select-subscribers")[0];
    var subscribersModal = document.getElementById("my-modal");
    var iconOpenModal = document.getElementById("i-subscribers");
    iconOpenModal.onclick = function openModal() {
        subscribersModal.style.display = "block";
    }
    var close = document.getElementsByClassName("close")[1];
    close.onclick = function closemodalek() {
        subscribersModal.style.display = "none";
    }
    // close.onclick = function close() {
    //     const modal = document.getElementById("my-modal").style.display = "none";
    // }


    // const cc = document.getElementsByClassName("create-invoice")[0];
    // cc.onclick = function close() {
    //     // cc.style.display = "none";
    // }
}


function closeModal(element) {
    const modal = document.getElementsByClassName("create-invoice")[0];
    modal.style.display = "none";
}
function openModal() {
    // const modal = document.getElementById("my-modal");
    // modal.style.display = "block";
    const modal = document.getElementsByClassName("create-invoice")[0];
    modal.style.display = "block";
}
// START drag and drop section
function allowDrop(element) {
    element.preventDefault();
}
function onDrag(element) {
    console.log("onDrag: " + element.dataTransfer.setData("text", element.target.className));
    element.dataTransfer.setData("text", element.target.className);
}
function onDrop(element){
    element.preventDefault();
    const getTransferedElement = document.getElementsByClassName(element.dataTransfer.getData("text"))[0];
    console.log("onDrop: " + getTransferedElement);
    if (element.target.value.length > 0 ) {
        element.target.value += ", ";
    }
    element.target.value += getTransferedElement.innerHTML;
}
// END drag and drop section