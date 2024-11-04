import express from "express";
import { verifyToken } from "../../utils/verifyUser.js";
import * as categoryController from "./category.controller.js";

const router = express.Router();

router.post("/create", verifyToken, categoryController.createCategory);

router.get("/getcategories", categoryController.getCategories);

router.delete(
  "/category/:categoryId",
  verifyToken,
  categoryController.deleteCategory
);

router.put(
  "/category/:categoryId",
  verifyToken,
  categoryController.updateCategory
);

export default router;
