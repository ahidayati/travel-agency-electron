"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('ipcRendererCustom', {
    onceInitData: function (cb) {
        electron_1.ipcRenderer.once('init-data', cb);
    },
    invokeAddNewTrip: function (newTrip, cb) {
        electron_1.ipcRenderer
            .invoke('add-new-trip', newTrip)
            .then(cb);
    }
});
