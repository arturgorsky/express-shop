import Product from "../models/product";
import { NextFunction, Request, Response } from "express";

class ShopController {
  getProducts = (req: Request, res: Response, next: NextFunction) => {
    Product.fetchAll((products) => {
      res.render("shop/product-list", {
        products,
        pageTitle: "All Products",
        path: "/products",
      });
    });
  };

  getIndex = (req: Request, res: Response, next: NextFunction) => {
    Product.fetchAll((products) => {
      res.render("shop/index", {
        products,
        pageTitle: "shop",
        path: "/",
      });
    });
  };

  getCart = (req: Request, res: Response, next: NextFunction) => {
    res.render("shop/cart", {
      pageTitle: "Your Cart",
      path: "cart",
    });
  };

  getOrders = (req: Request, res: Response, next: NextFunction) => {
    res.render("shop/orders", {
      pageTitle: "Your Orders",
      path: "/orders",
    });
  };

  getCheckout = (req: Request, res: Response, next: NextFunction) => {
    res.render("shop/checkout", {
      pageTitle: "Checkout",
      path: "/checkout",
    });
  };

  getProduct = (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    Product.findById(productId, (product) => {
      res.render("shop/product-detail", {
        product,
        pageTitle: "Product Details",
        path: "/products",
      });
    });
  };

  postCart = (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.body;
    console.log(productId);
    res.redirect("/");
  };
}

const shopController = new ShopController();
export default shopController;
