import { NextFunction, Request, RequestHandler, Response } from "express";

class ProductsController {
  products: Array<{ title: string }> = [];

  getAddProductPage = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    res.render("add-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
    });
  };

  postAddProduct = (req: Request, res: Response, next: NextFunction): void => {
    this.products.push({ title: req.body.title });
    res.redirect("/");
  };

  getProducts = (req: Request, res: Response, next: NextFunction): void => {
    res.render("shop", {
      prods: this.products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: this.products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  };
}

const productsController = new ProductsController();
export default productsController;
