import Flight from '../models/flight.js';

const flightControllers = {
    getFlights: async (req, res) => {
        try {
            const allFlights = await Flight.find();
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
