import {app, BrowserWindow, dialog, ipcMain, Notification} from 'electron'
import App = Electron.App
import WindowManager, { WindowNameMapper } from './WindowManager'
import tripService from "../services/trip.service";


export default class Main {

    private app: App

    constructor() {
        this.app = app
        this.initDefaultListener()
    }

    private initDefaultListener(): void {
        this.app
            .whenReady()
            .then(()=>{
                this.generateMainWindow()
            })

        this.app
            .on('activate', () => {
                if(BrowserWindow.length === 0 && process.platform === 'darwin') {
                    this.generateMainWindow()
                }
            })

        this.app
            .on('window-all-closed', () => {
                if(process.platform !== 'darwin') {
                    app.quit()
                }
            })
    }

    private generateMainWindow(): void {
        const trips = tripService.getAll()
        WindowManager.createWindow(WindowNameMapper.INDEX, trips)

        ipcMain.on('ask-show-new-trip-form', (e: any)=> {

            if(WindowManager.hasWindow(WindowNameMapper.NEW_TRIP)) {
                WindowManager.getWindow(WindowNameMapper.NEW_TRIP).show()
            } else {
                WindowManager.createWindow(WindowNameMapper.NEW_TRIP, undefined, 800, 650)

                const newTaskWindow = WindowManager.getWindow(WindowNameMapper.NEW_TRIP)

                ipcMain.handle('add-new-trip', (e, newTrip) => {
                    const allTrip = tripService.getAll()
                    newTrip.id = allTrip.length > 0 ? allTrip[allTrip.length - 1].id + 1 : 1

                    tripService.insert(newTrip)

                    if (WindowManager.hasWindow(WindowNameMapper.INDEX)) {
                        const indexWindow = WindowManager.getWindow(WindowNameMapper.INDEX)
                        indexWindow.webContents.send('new-trip-added', newTrip)
                    } else {
                        const trips = tripService.getAll()
                        WindowManager.createWindow(WindowNameMapper.INDEX, trips)
                    }

                    return {
                        success: true,
                        message: 'Trip has been successfully added'
                    }
                })

                newTaskWindow.on('closed', ()=> {
                    ipcMain.removeHandler('add-new-trip')
                })
            }

        })

        ipcMain.on('show-detail-trip', (e: any, id: number) => {
            if(WindowManager.hasWindow(WindowNameMapper.DETAIL_TRIP)) {
                WindowManager.getWindow(WindowNameMapper.DETAIL_TRIP).show()
            } else {
                const detailTripToShow = tripService.getById(id)
                if(!detailTripToShow) throw 'Trip does not exist'

                WindowManager.createWindow(WindowNameMapper.DETAIL_TRIP, detailTripToShow, 1000, 500)

                this.onShowEditTripForm()

                this.removeTripHandler()

                const detailWindow = WindowManager.getWindow(WindowNameMapper.DETAIL_TRIP)
                detailWindow.on('closed', ()=> {
                    ipcMain.removeHandler('show-detail-trip')
                    ipcMain.removeHandler('remove-trip')
                })
            }
        })
    }

    private onShowEditTripForm(): void {
        ipcMain.on('ask-show-edit-trip-form', (e: any, id: number) => {
            if(WindowManager.hasWindow(WindowNameMapper.EDIT_TRIP)) {
                WindowManager.getWindow(WindowNameMapper.EDIT_TRIP).show()
            } else {

                const tripToEdit = tripService.getById(id)
                if(!tripToEdit) throw 'Trip does not exist'
                WindowManager.createWindow(WindowNameMapper.EDIT_TRIP, tripToEdit, 800, 650)

                const editWindow = WindowManager.getWindow(WindowNameMapper.EDIT_TRIP)

                ipcMain.handle('edit-trip', (e: any, editedTrip: any) => {

                    if(!editedTrip) throw 'Trip does not exist'
                    tripService.updateById(editedTrip)

                    if (WindowManager.hasWindow(WindowNameMapper.INDEX)) {
                        const indexWindow = WindowManager.getWindow(WindowNameMapper.INDEX)
                        indexWindow.webContents.send('trip-edited', editedTrip)
                    } else {
                        const trips = tripService.getAll()
                        WindowManager.createWindow(WindowNameMapper.INDEX, trips)
                    }

                    if (WindowManager.hasWindow(WindowNameMapper.DETAIL_TRIP)) {
                        const detailWindow = WindowManager.getWindow(WindowNameMapper.DETAIL_TRIP)
                        detailWindow.webContents.send('detail-trip-edited', editedTrip)
                    }

                    return {
                        success: true,
                        message: 'Trip has been successfully modified'
                    }
                })

                editWindow.on('closed', ()=> {
                    ipcMain.removeHandler('edit-trip')
                })
            }
        })
    }

    private removeTripHandler(): void {
        ipcMain.handle('remove-trip', (e: any, id: number) => {
            const choice = dialog.showMessageBoxSync({
                title: 'Delete Trip',
                message: 'Are you sure you want to delete this trip?',
                buttons: ['No', 'Yes']
            })

            // if yes, then delete
            if(choice) {
                tripService.removeById(id)

                if (WindowManager.hasWindow(WindowNameMapper.INDEX)) {
                    const indexWindow = WindowManager.getWindow(WindowNameMapper.INDEX)
                    indexWindow.webContents.send('trip-removed', id)
                } else {
                    const trips = tripService.getAll()
                    WindowManager.createWindow(WindowNameMapper.INDEX, trips)
                }

                new Notification({
                    title: 'Awesome Travel Desktop App',
                    body: 'Trip has been successfully deleted'
                }).show()

                return {
                    success: true,
                    message: 'Trip has been successfully deleted'
                }
            }

            return {
                success: false
            }
        })

    }
}