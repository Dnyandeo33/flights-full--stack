import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
    flight_number: {
        type: Number,
        required: true,
        unique: true
    },
    airline: {
        type: String,
        required: [true, 'Name must be provided']
    },
    departure_city: {
        type: String,
        required: [true, 'Name must be provided']
    },
    departure_airport: {
        type: String,
        required: [true, 'Name must be provided']
    },
    arrival_city: {
        type: String,
        required: [true, 'Name must be provided']
    },
    arrival_airport: {
        type: String,
        required: [true, 'Name must be provided']
    },
    departure_time: {
        type: Date,
        required: [true, 'Must be provided']
    },
    arrival_time: {
        type: Date,
        require: [true, 'Must be provided']
    },
    duration: {
        type: Number,
        required: [true, 'Must be provided']
    },
    price: {
        type: Number,
        required: [true, 'Must be provided']
    }
});

export default mongoose.model('Flight', flightSchema);
