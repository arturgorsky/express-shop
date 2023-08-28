import { NextFunction, Request, RequestHandler, Response } from "express";
import Product from "../models/product";

class AdminController {
  getAddProductPage = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    res.render("admin/add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
    });
  };

  postAddProduct = (
    req: Request<Product>,
    res: Response,
    next: NextFunction
  ): void => {
    const { title, imageUrl, description, price } = req.body;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect("/");
  };

  getProducts = (req: Request, res: Response, next: NextFunction): void => {
    Product.fetchAll((products) => {
      res.render("admin/products", {
        products,
        pageTitle: "Shop",
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    });
  };
}

const adminController = new AdminController();
export default adminController;
