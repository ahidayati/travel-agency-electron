import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
    'ipcRendererCustom', {
        onceInitData: (cb: any) => {
            ipcRenderer.once('init-data', cb)
        },
        sendAskShowNewTripForm: () => {
            ipcRenderer.send('ask-show-new-trip-form')
        },
        onNewTripAdded: (cb: any) => {
            ipcRenderer.on('new-trip-added', cb)
        },
        sendShowDetailTrip: (id: number) => {
            ipcRenderer.send('show-detail-trip', id)
        },
        onTripEdited: (cb: any) => {
            ipcRenderer.on('trip-edited', cb)
        },
        onTripRemoved: (cb: any) => {
            ipcRenderer.on('trip-removed', cb)
        },
    }
)

