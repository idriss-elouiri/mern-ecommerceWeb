import express from 'express';
import { verifyToken } from '../../utils/verifyUser.js';
import * as categoryController from "./category.controller.js";

const router = express.Router();

router.post('/create', verifyToken, categoryController.createcateg)
router.get('/getcategories', categoryController.getcategories)
router.delete('/deletecategory/:categoryId', verifyToken, categoryController.deletecatg)
router.put('/updatecategory/:categoryId', verifyToken, categoryController.updatedcateg)


export default router;