window.onload = function hideAndShowElements() {
    document.getElementsByClassName("create-invoice")[0].style.display = "none";
    var subscribersModal = document.getElementById("my-modal");
    var iconOpenModal = document.getElementById("i-subscribers");
    iconOpenModal.onclick = function openModal() {
        subscribersModal.style.display = "block";
    }
    var close = document.getElementsByClassName("close")[1];
    close.onclick = function closemodalek() {
        subscribersModal.style.display = "none";
    }
}
function closeInvoice(element) {
    const modal = document.getElementsByClassName("create-invoice")[0];
    modal.style.display = "none";
}
function openInvoice() {
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

// list box
function countMaxHeight() {
    let title = document.getElementsByClassName("invoice-subscriber-title")[0];
    let btn = document.getElementsByClassName("btn-items")[0];
    let minusHeight = title.offsetHeight + btn.offsetHeight + 50;
    let invoiceBodyHeight = document.getElementsByClassName("invoice-body")[0];
    let multiSelect = document.getElementById("checkboxes");
    let finalValue = invoiceBodyHeight.offsetHeight - minusHeight;
    multiSelect.style.maxHeight = finalValue + "px";
    console.log(invoiceBodyHeight.offsetHeight + "wtf " + minusHeight);
}
var expanded = false;
function showCheckboxes() {
  countMaxHeight()
  var checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}
// end of list box