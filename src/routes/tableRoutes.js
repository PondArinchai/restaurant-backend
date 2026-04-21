import express from 'express';
import { createTable } from '../controllers/tableController.js';

const router = express.Router();


router.post('/', createTable); // POST /api/tables

export default router;