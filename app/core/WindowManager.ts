import { BrowserWindow } from "electron"
import path from 'path'

export enum WindowNameMapper {
    INDEX = 'index',
    NEW_TRIP = 'new-trip',
    EDIT_TRIP = 'edit-trip',
    DETAIL_TRIP = 'detail-trip'
}

type Windows = Map<WindowNameMapper, BrowserWindow> 

class WindowManager {
    private windows: Windows

    constructor () {
        this.windows = new Map<WindowNameMapper, BrowserWindow>()
    }

    getWindow(windowName: WindowNameMapper): BrowserWindow {
        if(this.hasWindow(windowName)){
            return this.windows.get(windowName) as BrowserWindow
        }
        throw 'View does not exist'
    }

    addWindow(windowName: WindowNameMapper, windowToAdd: BrowserWindow): void {
        this.windows.set(windowName, windowToAdd)
    }

    deleteWindow(windowName: WindowNameMapper): boolean {
        if(this.hasWindow(windowName)){
            return this.windows.delete(windowName)
        }
        throw 'View does not exist'
    }

    hasWindow(windowName: WindowNameMapper): boolean {
        return this.windows.has(windowName)
    }

    createWindow(templateName: WindowNameMapper, templateData?: any, width=1400, height=1200):void {
        const win = new BrowserWindow({
            width,
            height,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path.join(__dirname, '..', 'preloads', `${templateName}.preload.js`)
                }
        })

        win
        .loadFile(path.join(__dirname, '..', '..', 'src', 'views', templateName, `${templateName}.html`))
        .then(()=>{
            if(templateData) { // if it's not undefined
                win.webContents.send('init-data', templateData)
            }
        })

        win.on('closed', () => {
            this.deleteWindow(templateName)
        })

        this.addWindow(templateName, win)
    }

}

export default new WindowManager()