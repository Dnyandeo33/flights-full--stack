import express from 'express';

const router = express.Router();

import flightControllers from '../controllers/flight.js';
import verifyToken from '../middleware/verifyToken.js';

const { getFlights, postFlight, getOneFlight, updateFlight, deleteFlight } =
    flightControllers;

// routes
router.get('/', getFlights);
router.post('/', postFlight);
router.get('/:id', getOneFlight);
router.put('/:id', updateFlight);
router.delete('/:id', deleteFlight);

export default router;
