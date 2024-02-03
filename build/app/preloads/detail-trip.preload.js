"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('ipcRendererCustom', {
    onceInitData: function (cb) {
        electron_1.ipcRenderer.once('init-data', cb);
    },
    sendAskShowEditTripForm: function (id) {
        electron_1.ipcRenderer.send('ask-show-edit-trip-form', id);
    },
    onDetailTripEdited: function (cb) {
        electron_1.ipcRenderer.on('detail-trip-edited', cb);
    },
    invokeRemoveTrip: function (id, cb) {
        electron_1.ipcRenderer
            .invoke('remove-trip', id)
            .then(cb);
    }
});
