"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var WindowManager_1 = __importStar(require("./WindowManager"));
var trip_service_1 = __importDefault(require("../services/trip.service"));
var Main = /** @class */ (function () {
    function Main() {
        this.app = electron_1.app;
        this.initDefaultListener();
    }
    Main.prototype.initDefaultListener = function () {
        var _this = this;
        this.app
            .whenReady()
            .then(function () {
            _this.generateMainWindow();
        });
        this.app
            .on('activate', function () {
            if (electron_1.BrowserWindow.length === 0 && process.platform === 'darwin') {
                _this.generateMainWindow();
            }
        });
        this.app
            .on('window-all-closed', function () {
            if (process.platform !== 'darwin') {
                electron_1.app.quit();
            }
        });
    };
    Main.prototype.generateMainWindow = function () {
        var _this = this;
        var trips = trip_service_1.default.getAll();
        WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.INDEX, trips);
        electron_1.ipcMain.on('ask-show-new-trip-form', function (e) {
            if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.NEW_TRIP)) {
                WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.NEW_TRIP).show();
            }
            else {
                WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.NEW_TRIP, undefined, 800, 650);
                var newTaskWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.NEW_TRIP);
                electron_1.ipcMain.handle('add-new-trip', function (e, newTrip) {
                    var allTrip = trip_service_1.default.getAll();
                    newTrip.id = allTrip.length > 0 ? allTrip[allTrip.length - 1].id + 1 : 1;
                    trip_service_1.default.insert(newTrip);
                    if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.INDEX)) {
                        var indexWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.INDEX);
                        indexWindow.webContents.send('new-trip-added', newTrip);
                    }
                    else {
                        var trips_1 = trip_service_1.default.getAll();
                        WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.INDEX, trips_1);
                    }
                    return {
                        success: true,
                        message: 'Trip has been successfully added'
                    };
                });
                newTaskWindow.on('closed', function () {
                    electron_1.ipcMain.removeHandler('add-new-trip');
                });
            }
        });
        electron_1.ipcMain.on('show-detail-trip', function (e, id) {
            if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.DETAIL_TRIP)) {
                WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.DETAIL_TRIP).show();
            }
            else {
                var detailTripToShow = trip_service_1.default.getById(id);
                if (!detailTripToShow)
                    throw 'Trip does not exist';
                WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.DETAIL_TRIP, detailTripToShow, 1000, 500);
                _this.onShowEditTripForm();
                _this.removeTripHandler();
                var detailWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.DETAIL_TRIP);
                detailWindow.on('closed', function () {
                    electron_1.ipcMain.removeHandler('show-detail-trip');
                    electron_1.ipcMain.removeHandler('remove-trip');
                });
            }
        });
    };
    Main.prototype.onShowEditTripForm = function () {
        electron_1.ipcMain.on('ask-show-edit-trip-form', function (e, id) {
            if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.EDIT_TRIP)) {
                WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.EDIT_TRIP).show();
            }
            else {
                var tripToEdit = trip_service_1.default.getById(id);
                if (!tripToEdit)
                    throw 'Trip does not exist';
                WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.EDIT_TRIP, tripToEdit, 800, 650);
                var editWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.EDIT_TRIP);
                electron_1.ipcMain.handle('edit-trip', function (e, editedTrip) {
                    if (!editedTrip)
                        throw 'Trip does not exist';
                    trip_service_1.default.updateById(editedTrip);
                    if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.INDEX)) {
                        var indexWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.INDEX);
                        indexWindow.webContents.send('trip-edited', editedTrip);
                    }
                    else {
                        var trips = trip_service_1.default.getAll();
                        WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.INDEX, trips);
                    }
                    if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.DETAIL_TRIP)) {
                        var detailWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.DETAIL_TRIP);
                        detailWindow.webContents.send('detail-trip-edited', editedTrip);
                    }
                    return {
                        success: true,
                        message: 'Trip has been successfully modified'
                    };
                });
                editWindow.on('closed', function () {
                    electron_1.ipcMain.removeHandler('edit-trip');
                });
            }
        });
    };
    Main.prototype.removeTripHandler = function () {
        electron_1.ipcMain.handle('remove-trip', function (e, id) {
            var choice = electron_1.dialog.showMessageBoxSync({
                title: 'Delete Trip',
                message: 'Are you sure you want to delete this trip?',
                buttons: ['No', 'Yes']
            });
            // if yes, then delete
            if (choice) {
                trip_service_1.default.removeById(id);
                if (WindowManager_1.default.hasWindow(WindowManager_1.WindowNameMapper.INDEX)) {
                    var indexWindow = WindowManager_1.default.getWindow(WindowManager_1.WindowNameMapper.INDEX);
                    indexWindow.webContents.send('trip-removed', id);
                }
                else {
                    var trips = trip_service_1.default.getAll();
                    WindowManager_1.default.createWindow(WindowManager_1.WindowNameMapper.INDEX, trips);
                }
                new electron_1.Notification({
                    title: 'Awesome Travel Desktop App',
                    body: 'Trip has been successfully deleted'
                }).show();
                return {
                    success: true,
                    message: 'Trip has been successfully deleted'
                };
            }
            return {
                success: false
            };
        });
    };
    return Main;
}());
exports.default = Main;
