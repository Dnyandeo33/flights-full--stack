import express from 'express';

const router = express.Router();

import userControllers from '../controllers/user.js';
const { signUp, signIn, signOut } = userControllers;

// routes
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);

export default router;
