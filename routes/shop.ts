import express from "express";
import productsController from "../controllers/products";

export const shopRoutes = express.Router();
const { products } = productsController;

shopRoutes.get("/", productsController.getProducts);
