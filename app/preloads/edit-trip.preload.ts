import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
    'ipcRendererCustom', {
        onceInitData: (cb: any) => {
            ipcRenderer.once('init-data', cb)
        },
        invokeEditTrip: (tripEdited: any, cb: any) => {
            ipcRenderer
                .invoke('edit-trip', tripEdited)
                .then(cb)
        }
    }
)