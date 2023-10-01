import express from "express";
import shopController from "../controllers/shopController";

export const shopRoutes = express.Router();

shopRoutes.get("/", shopController.getIndex);

shopRoutes.get("/products", shopController.getProducts);

shopRoutes.get("/products/:productId", shopController.getProduct);

shopRoutes.get("/cart", shopController.getCart);

shopRoutes.post("/cart", shopController.postCart);

shopRoutes.get("/orders", shopController.getOrders);

shopRoutes.get("/checkout", shopController.getCheckout);

shopRoutes.post("/cart-delete-item", shopController.postCartDeleteProduct);
