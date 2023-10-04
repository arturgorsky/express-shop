import { NextFunction, Request, RequestHandler, Response } from "express";
import Product from "../models/product";

class AdminController {
  getAddProductPage = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false,
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
    });
  };

  postAddProduct = async (
    req: Request<Product>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { title, imageUrl, description, price } = req.body;
    const product = new Product("", title, imageUrl, description, price);
    const result = await product.save();

    res.redirect("/");
  };

  getEditProductPage = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const editMode = req.query["edit"] === "true";

    if (!editMode) {
      return res.redirect("/");
    }

    const { productId } = req.params;

    // Product.findById(productId, (product) => {
    //   if (!product) {
    //     return res.redirect("/");
    //   }
    //   res.render("admin/edit-product", {
    //     pageTitle: "Edit Product",
    //     path: "/admin/edit-product",
    //     formsCSS: true,
    //     productCSS: true,
    //     activeAddProduct: true,
    //     editing: editMode,
    //     product: product,
    //   });
    // });
  };

  getProducts = (req: Request, res: Response, next: NextFunction): void => {
    //   res.render("admin/products", {
    //     products,
    //     pageTitle: "Shop",
    //     path: "/",
    //     hasProducts: products.length > 0,
    //     activeShop: true,
    //     productCSS: true,
    //   });
  };

  postEditProduct = (req: Request, res: Response, next: NextFunction): void => {
    const { productId, title, imageUrl, price, description } = req.body;

    const updatedProduct = new Product(
      productId,
      title,
      imageUrl,
      description,
      price
    );

    updatedProduct.save();

    return res.redirect("/admin/products");
  };

  postDeleteProduct = (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const { productId } = req.body;
    Product.deleteById(productId);

    return res.redirect("/admin/products");
  };
}

const adminController = new AdminController();
export default adminController;
