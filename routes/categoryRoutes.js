import express from "express";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
} from "../controllers/categoryController.js";

const categoryRoutes = express.Router();

categoryRoutes.post("/", createCategory);
categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:categoryId", getCategoryById);
categoryRoutes.patch("/:categoryId", updateCategoryById);
categoryRoutes.delete("/:categoryId", deleteCategoryById);

export default categoryRoutes;
