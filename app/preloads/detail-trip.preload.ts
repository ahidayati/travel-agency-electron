import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld(
    'ipcRendererCustom', {
        onceInitData: (cb: any) => {
            ipcRenderer.once('init-data', cb)
        },
        sendAskShowEditTripForm: (id: number) => {
            ipcRenderer.send('ask-show-edit-trip-form', id)
        },
        onDetailTripEdited: (cb: any) => {
            ipcRenderer.on('detail-trip-edited', cb)
        },
        invokeRemoveTrip: (id: number, cb: any)=>{
            ipcRenderer
                .invoke('remove-trip', id)
                .then(cb)
        }
    }
)