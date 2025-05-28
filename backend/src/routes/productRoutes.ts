import express from 'express';
import { getProducts, createProduct } from '../controllers/productController';
import { validateCreateProduct } from '../middlewares/validations';

const router = express.Router();

router.get('/product', getProducts);
router.post('/product', validateCreateProduct, createProduct);

export default router;
