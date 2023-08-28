import express from "express";
import shopController from "../controllers/shopController";

export const shopRoutes = express.Router();

shopRoutes.get("/", shopController.getProducts);

shopRoutes.get("/products", shopController.getProducts);

shopRoutes.get("/cart", shopController.getCart);

shopRoutes.get("/orders", shopController.getOrders);

shopRoutes.get("/checkout", shopController.getCheckout);
