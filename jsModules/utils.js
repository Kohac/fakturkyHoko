import * as api from './apiCall.js';
import * as buildIn from './buildInSettings.js';
export function translateMap(stringKey) {
    const map = new Map();
    map.set("itemId", "Číslo položky faktury");
    map.set("productName", "Položka faktury");
    map.set("unitPriceWithVat", "Cena položky s DPH");
    map.set("rateVat", "Sazba DPH");
    map.set("Číslo položky faktury", "itemId");
    map.set("Položka faktury", "productName");
    map.set("Cena položky s DPH", "unitPriceWithVat");
    map.set("Sazba DPH", "rateVat");
    return map.get(stringKey);
}
export function loadItemsFromApi(){
    const getApiData = api.getApiCall("http://localhost:9090/api/v1/items");
    getApiData.then(
        (value) => {buildIn.createTableItems(value)},
        (error) => {console.log("Nepodařilo se načíst data!" + error)
    });
}
export function reloadItemTable() {
    const table = document.getElementById("table-items");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    loadItemsFromApi();
}
export function clearModalContent() {
    const modal = document.getElementById("modal-content");
    while (modal.firstChild) {
        modal.removeChild(modal.firstChild);
    }
}