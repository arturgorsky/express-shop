import express from "express";
import productsController from "../controllers/products";

export const adminRoutes = express.Router();

// /admin/add-product => GET
adminRoutes.get("/add-product", productsController.getAddProductPage);

// /admin/add-product => POST
adminRoutes.post("/add-product", productsController.postAddProduct);
