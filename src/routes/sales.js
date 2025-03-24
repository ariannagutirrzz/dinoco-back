import { Router } from 'express';
import { 
    deleteOneSaleController,
    getAllSalesController, 
    createSaleController, 
    updateSaleController,
} from '../controllers/sales.js'; // Update the path to use 'sales' controller

const router = Router();

router.get('/', getAllSalesController); // Get all sales
router.post('/', createSaleController); // Create a new sale
router.delete('/:id', deleteOneSaleController); // Delete a sale by ID
router.put('/:id', updateSaleController); // Update a sale by ID

export default router;
