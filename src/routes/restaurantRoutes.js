import express from 'express';
import { createRestaurant,getRestaurants} from '../controllers/restaurantControllers.js';

const router = express.Router();
router.post('/restaurants', createRestaurant); // POST /api/restaurants
router.get('/restaurants', getRestaurants); // GET /api/restaurants

export default router;