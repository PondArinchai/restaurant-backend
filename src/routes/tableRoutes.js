import express from 'express';
import { createTable,getTables,getTablerestaurant,getTableId,deleteTable,updateTablestatus } from '../controllers/tableController.js';

const router = express.Router();


router.post('/', createTable); // POST /api/tables
router.get('/', getTables); // GET /api/tables
router.get('/restaurant/:restaurantId', getTablerestaurant); // GET /api/tables/restaurant/:restaurantId
router.get('/:id', getTableId); // GET /api/tables/:id
router.delete('/:id', deleteTable); // DELETE /api/tables/:id    
router.put('/:id/status', updateTablestatus); // PUT /api/tables/:id/status

export default router;