"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowNameMapper = void 0;
var electron_1 = require("electron");
var path_1 = __importDefault(require("path"));
var WindowNameMapper;
(function (WindowNameMapper) {
    WindowNameMapper["INDEX"] = "index";
    WindowNameMapper["NEW_TRIP"] = "new-trip";
    WindowNameMapper["EDIT_TRIP"] = "edit-trip";
    WindowNameMapper["DETAIL_TRIP"] = "detail-trip";
})(WindowNameMapper || (exports.WindowNameMapper = WindowNameMapper = {}));
var WindowManager = /** @class */ (function () {
    function WindowManager() {
        this.windows = new Map();
    }
    WindowManager.prototype.getWindow = function (windowName) {
        if (this.hasWindow(windowName)) {
            return this.windows.get(windowName);
        }
        throw 'View does not exist';
    };
    WindowManager.prototype.addWindow = function (windowName, windowToAdd) {
        this.windows.set(windowName, windowToAdd);
    };
    WindowManager.prototype.deleteWindow = function (windowName) {
        if (this.hasWindow(windowName)) {
            return this.windows.delete(windowName);
        }
        throw 'View does not exist';
    };
    WindowManager.prototype.hasWindow = function (windowName) {
        return this.windows.has(windowName);
    };
    WindowManager.prototype.createWindow = function (templateName, templateData, width, height) {
        var _this = this;
        if (width === void 0) { width = 1400; }
        if (height === void 0) { height = 1200; }
        var win = new electron_1.BrowserWindow({
            width: width,
            height: height,
            webPreferences: {
                nodeIntegration: false,
                contextIsolation: true,
                preload: path_1.default.join(__dirname, '..', 'preloads', "".concat(templateName, ".preload.js"))
            }
        });
        win
            .loadFile(path_1.default.join(__dirname, '..', '..', 'src', 'views', templateName, "".concat(templateName, ".html")))
            .then(function () {
            if (templateData) { // if it's not undefined
                win.webContents.send('init-data', templateData);
            }
        });
        win.on('closed', function () {
            _this.deleteWindow(templateName);
        });
        this.addWindow(templateName, win);
    };
    return WindowManager;
}());
exports.default = new WindowManager();
