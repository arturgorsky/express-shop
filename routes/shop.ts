import express from "express";
import productsController from "../controllers/productsController";

export const shopRoutes = express.Router();

shopRoutes.get("/", productsController.getProducts);
