import * as listener from './listeners.js';
import * as api from './apiCall.js';
import * as buildIn from './buildInSettings.js';
import * as utils from './utils.js';

document.addEventListener("DOMContentLoaded", function() {
    listener.panelOneItemsListener();
    utils.loadItemsFromApi();
});