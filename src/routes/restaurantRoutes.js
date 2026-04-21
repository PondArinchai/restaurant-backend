import express from 'express';
import { createRestaurant } from '../controllers/restaurantControllers.js';

const router = express.Router();
router.post('/', createRestaurant); // POST /api/restaurants

export default router;