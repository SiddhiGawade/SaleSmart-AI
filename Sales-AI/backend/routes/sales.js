import express from 'express';
import { getSales, createSale, updateSale, deleteSale } from '../controllers/salesController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/', authMiddleware, getSales);
router.post('/', authMiddleware, createSale);
router.put('/:id', authMiddleware, updateSale);
router.delete('/:id', authMiddleware, deleteSale);

export default router;
