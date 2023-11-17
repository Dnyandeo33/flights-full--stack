import { json } from 'express';
import Flight from '../models/flight.js';
import User from '../models/user.js';

const flightControllers = {
    getFlights: async (req, res) => {
        try {
            const { flight_number,
                airline,
                departure_city,
                departure_airport,
                arrival_city,
                arrival_airport
            } = req.query;

            const queryObject = {};

            if (flight_number) {
                queryObject.flight_number = flight_number;
            }
            if (airline) {
                queryObject.airline = { "$regex": airline, "$options": 'i' }
            }
            if (departure_city) {
                queryObject.departure_city = { "$regex": departure_city, "$options": 'i' }
            }
            if (departure_airport) {
                queryObject.departure_airport = { "$regex": departure_airport, "$options": 'i' }
            }
            if (arrival_city) {
                queryObject.arrival_city = { "$regex": arrival_city, "$options": 'i' }
            }
            if (arrival_airport) {
                queryObject.arrival_airport = { "$regex": arrival_airport, "$options": 'i' }
            }

            const allFlights = await Flight.find(queryObject);
            if (!allFlights) {
                return res
                    .status(404)
                    .json({
                        success: false,
                        message: `No flights data available`
                    });
            }
            return res.status(200).json({ Success: true, Flights: allFlights });
        } catch (error) {
            return res
                .status(500)
                .json({ Success: false, Error: error.message });
        }
    },

    postFlight: async (req, res) => {
        try {
            const { ...flightDetails } = req.body;
            const addFlight = await Flight.create(flightDetails);
            return res
                .status(200)
                .json({ Success: true, newFlight: addFlight });
        } catch (error) {
            return res
                .status(500)
                .json({ Success: false, Error: error.message });
        }
    },

    putBooking: async (req, res) => {
        try {
            const { _id, id } = req.body;

            const flight = await Flight.findById(_id)
            const user = await User.findById(id)

            const myBooking = user.myBooking.push(flight)
            await user.save()

            return res.status(200), json({ Success: true, myBooking: myBooking })
        } catch (error) {
            return res
                .status(500)
                .json({ Success: false, Error: error.message });
        }
    },

    getBookingId: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id)
            return res.status(200).json({ Success: true, myBooking: user?.myBooking })

        } catch (error) {
            return res
                .status(500)
                .json({ Success: false, Error: error.message });
        }
    },

    getBooking: async (req, res) => {
        const { id } = req.params;
        try {
            const user = await User.findById(id)
            const myBooking = await Flight.find({
                _id: { $in: user.myBooking }
            })
            return res.status(200).json({ Success: true, myBooking: myBooking });
        } catch (error) {
            return res
                .status(500)
                .json({ Success: false, Error: error.message });
        }
    },

    getOneFlight: async (req, res) => {
        try {
            const { id } = req.params;
            const oneFlight = await Flight.findOne({ _id: id });
            if (!oneFlight) {
                return res
                    .status(404)
                    .json({
                        Success: false,
                        message: `flight with ${id} not available... `
                    });
            }
            return res.status(200).json({ Success: true, oneFlight });
        } catch (error) {
            return res
                .status(500)
                .json({ Success: false, Error: error.message });
        }
    },

    updateFlight: async (req, res) => {
        try {
            const { id } = req.params;
            const { ...flightDetails } = req.body;

            const updateFlight = await Flight.updateOne(
                { _id: id },
                { ...flightDetails }
            );
            if (updateFlight.modifiedCount > 0) {
                return res
                    .status(200)
                    .json({
                        Success: true,
                        message: `Flight with ${id} updated successfully...`
                    });
            }
            return res
                .status(404)
                .json({
                    Success: false,
                    message: `Flight with ${id} not found`
                });
        } catch (error) {
            return res
                .status(500)
                .json({ Success: false, Error: error.message });
        }
    },

    deleteFlight: async (req, res) => {
        try {
            const { id } = req.params;
            const deleteFlight = await Flight.deleteOne({ _id: id });
            if (deleteFlight.deletedCount > 0) {
                return res
                    .status(200)
                    .json({
                        Success: true,
                        message: `Flight with ${id} deleted successfully...`
                    });
            }
            return res
                .status(404)
                .json({
                    Success: false,
                    message: `Flight with ${id} not found`
                });
        } catch (error) {
            return res
                .status(500)
                .json({ Success: false, Error: error.message });
        }
    }
};

export default flightControllers;
