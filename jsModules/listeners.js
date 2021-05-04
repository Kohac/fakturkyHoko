import * as build from './buildInSettings.js';
import * as modal from './modals.js';
export function panelOneItemsListener() {
    const items = document.getElementsByClassName("flex-panel");
    for (const item of items) {
        item.addEventListener('click', () => {
            console.log(item.id);
            document.getElementById(item.id + "s").style.display = "block";
        })
    }
    createItemListener();
    closeModalListener();
    // editItemListener();
}

function createItemListener() {
    document.getElementById("create-item").addEventListener('click', () => {
        build.createModalCreateItem();
    });
}
// function editItemListener() {
//     document.getElementById("create-item").addEventListener('click', () => {
//         build.createModalEditItem();
//     });
// }
function closeModalListener() {
    document.getElementById("close").addEventListener('click', () => {
        modal.closeModal();
    });
}