import express from "express";
import adminController from "../controllers/adminController";

export const adminRoutes = express.Router();

// /admin/add-product => GET
adminRoutes.get("/add-product", adminController.getAddProductPage);

// admin/products
adminRoutes.get("/products", adminController.getProducts);

// /admin/add-product => POST
adminRoutes.post("/add-product", adminController.postAddProduct);

adminRoutes.get("/edit-product/:productId", adminController.getEditProductPage);
