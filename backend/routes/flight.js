import express from 'express';

const router = express.Router();

import flightControllers from '../controllers/flight.js';
import verifyToken from '../middleware/verifyToken.js';

const { getFlights, postFlight, getOneFlight, updateFlight, deleteFlight } =
    flightControllers;

// routes
router.get('/', getFlights);
router.get('/:id', getOneFlight);
router.post('/', verifyToken, postFlight);
router.put('/:id', verifyToken, updateFlight);
router.delete('/:id', verifyToken, deleteFlight);

export default router;
