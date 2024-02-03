"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var trip_model_1 = require("../models/trip.model");
var TripService = /** @class */ (function () {
    function TripService() {
        this.trips = trip_model_1.Trip.generateFakeData();
    }
    TripService.prototype.getAll = function () {
        return this.trips;
    };
    TripService.prototype.insert = function (newTrip) {
        this.trips.push(newTrip);
    };
    TripService.prototype.getById = function (id) {
        return this.trips.find(function (t) { return t.id === id; });
    };
    TripService.prototype.removeById = function (id) {
        this.trips = this.trips.filter(function (t) { return t.id !== id; });
    };
    TripService.prototype.updateById = function (editedTrip) {
        var index = this.trips.findIndex(function (t) { return t.id === editedTrip.id; });
        if (index < 0)
            throw 'Id does not match any trip';
        this.trips[index] = editedTrip;
    };
    return TripService;
}());
exports.default = new TripService();
