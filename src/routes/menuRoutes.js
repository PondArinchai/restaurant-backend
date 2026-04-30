import express from 'express';
import { createMenuItem,getMenuItemsById,updateMenuItem,deleteMenuItem } from '../controllers/menuController.js';

const router = express.Router();


router.post('/', createMenuItem); // POST /api/menu
router.get('/:id', getMenuItemsById); // GET /api/menu/:id
router.put('/:id', updateMenuItem); // PUT /api/menu/:id
router.delete('/:id', deleteMenuItem); // DELETE /api/menu/:id  


export default router;