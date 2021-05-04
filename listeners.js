// document.addEventListener("DOMContentLoaded", function() {
//     panelOneItemsListener();
// });
export function panelOneItemsListener() {
    const items = document.getElementsByClassName("flex-panel");
    for (const item of items) {
        item.addEventListener('click', () => {
            console.log(item.id);
            document.getElementById(item.id + "s").style.display = "block";
        })
    }
}