import { NextFunction, Request, RequestHandler, Response } from "express";
import Product from "../models/product";

class ProductsController {
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

  postAddProduct = (req: Request, res: Response, next: NextFunction): void => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect("/");
  };

  getProducts = (req: Request, res: Response, next: NextFunction): void => {
    Product.fetchAll((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    });
  };
}

const productsController = new ProductsController();
export default productsController;
