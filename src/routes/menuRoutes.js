import express from 'express';
import { createMenuItem } from '../controllers/menuController.js';

const router = express.Router();


router.post('/', createMenuItem); // POST /api/menu

export default router;