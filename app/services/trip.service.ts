import { Trip } from "../models/trip.model";

class TripService {
    private trips: Trip[]

    constructor() {
        this.trips = Trip.generateFakeData()
    }

    getAll(): Trip[] {
        return this.trips
    }

    insert(newTrip: Trip): void {
        this.trips.push(newTrip)
    }

    getById(id: number): Trip | undefined {
        return this.trips.find(t => t.id === id)
    }

    removeById(id: number): void {
        this.trips = this.trips.filter(t => t.id !== id)
    }

    updateById(editedTrip: Trip): void {
        const index = this.trips.findIndex(t => t.id === editedTrip.id)
        if(index < 0 ) throw 'Id does not match any trip'
        this.trips[index] = editedTrip
    }
}

export default new TripService()