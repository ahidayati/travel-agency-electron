import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
    'ipcRendererCustom', {
        onceInitData: (cb: any) => {
            ipcRenderer.once('init-data', cb)
        },
        invokeAddNewTrip: (newTrip: any, cb: any)=>{
            ipcRenderer
                .invoke('add-new-trip', newTrip)
                .then(cb)
        }
    }
)