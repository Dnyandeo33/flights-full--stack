import express from 'express';
import flightControllers from '../controllers/flight.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

const { getFlights, postFlight, getOneFlight, putBooking, getBookingId, getBooking, updateFlight, deleteFlight } =
    flightControllers;

// routes
router.get('/', getFlights);
router.post('/', verifyToken, postFlight);

router.put('/my-booking', putBooking);
router.get('/my-bookingId/:id', getBookingId);
router.get('/my-booking/:id', getBooking);

router.get('/:id', getOneFlight);
router.put('/:id', verifyToken, updateFlight);
router.delete('/:id', verifyToken, deleteFlight);

export default router;
