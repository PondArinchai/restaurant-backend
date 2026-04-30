import express from 'express';
import { createRestaurant,getRestaurants,getrestaurantId,getrestaurantMenu,updateRestaurant,deleteRestaurant} from '../controllers/restaurantControllers.js';

const router = express.Router();
router.post('/', createRestaurant); // POST /api/restaurants
router.get('/', getRestaurants); // GET /api/restaurants
router.get('/:id', getrestaurantId); // GET /api/restaurants/:id
router.get('/:id/menu', getrestaurantMenu); // GET /api/restaurants/:id/menu
router.put('/:id', updateRestaurant); // PUT /api/restaurants/:id
router.delete('/:id', deleteRestaurant); // DELETE /api/restaurants/:id

export default router;