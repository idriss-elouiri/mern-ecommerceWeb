import express from 'express';
import { verifyToken } from '../../utils/verifyUser.js';
import * as productController from "./product.controller.js";
import { productShcema } from './product.shcema.js';
import { validateZod } from '../../middlewares/validate-zod.js';

const router = express.Router();

router.post('/create', validateZod(productShcema), verifyToken, productController.create)
router.get('/getproducts', productController.getproducts)




export default router;