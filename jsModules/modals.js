import * as utils from './utils.js';
export function openModal(modalId){
    const modal = document.getElementById(modalId)
    modal.style.display = "block";
}
export function closeModal(){
    utils.clearModalContent();
    document.getElementById("modal").style.display = "none";
}