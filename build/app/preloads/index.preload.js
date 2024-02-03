"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld('ipcRendererCustom', {
    onceInitData: function (cb) {
        electron_1.ipcRenderer.once('init-data', cb);
    },
    sendAskShowNewTripForm: function () {
        electron_1.ipcRenderer.send('ask-show-new-trip-form');
    },
    onNewTripAdded: function (cb) {
        electron_1.ipcRenderer.on('new-trip-added', cb);
    },
    sendShowDetailTrip: function (id) {
        electron_1.ipcRenderer.send('show-detail-trip', id);
    },
    onTripEdited: function (cb) {
        electron_1.ipcRenderer.on('trip-edited', cb);
    },
    onTripRemoved: function (cb) {
        electron_1.ipcRenderer.on('trip-removed', cb);
    },
});
