import { NextFunction, Request, RequestHandler, Response } from "express";
import Product, { IProduct } from "../models/product";
import { Model } from "sequelize";

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
    req: Request<any>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { title, imageUrl, description, price } = req.body;
    try {
      await Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
      });
    } catch (error) {
      console.log(error);
    }

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
    const product = await Product.findByPk(productId);

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      editing: editMode,
      product: product,
    });
  };

  getProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const products = await Product.findAll();
    res.render("admin/products", {
      products,
      pageTitle: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  };

  postEditProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { productId, title, imageUrl, price, description } = req.body;

    const productToUpdate = (await Product.findByPk(
      productId
    )) as unknown as Model<IProduct, IProduct>;

    // @ts-ignore
    productToUpdate.title = title;
    // @ts-ignore
    productToUpdate.imgageUrl = imageUrl;
    // @ts-ignore
    productToUpdate.price = price;
    // @ts-ignore
    productToUpdate.description = description;

    await productToUpdate.save();

    return res.redirect("/admin/products");
  };

  postDeleteProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { productId } = req.body;
    const product = await Product.findByPk(productId);
    product?.destroy();

    return res.redirect("/admin/products");
  };
}

const adminController = new AdminController();
export default adminController;
