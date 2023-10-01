import Product from "../models/product";
import cart from "../models/cart";
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
    cart.getCartProducts((cartProducts) => {
      Product.fetchAll((products) => {
        const productsInCart = [];
        for (const product of products) {
          const cartProductData = cartProducts.find(
            (prod) => prod.id === product.id
          );
          if (cartProductData) {
            productsInCart.push({
              ...product,
              quantity: cartProductData.quantity,
            });
          }
        }

        res.render("shop/cart", {
          pageTitle: "Your Cart",
          path: "cart",
          products: productsInCart,
        });
      });
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
    Product.findById(productId, (product) => {
      cart.addProduct(product.id, product.price);
    });
    setTimeout(() => {
      res.redirect("/cart");
    }, 1000);
  };

  postCartDeleteProduct = (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.body;
    Product.findById(productId, (prod) => {
      cart.deleteProduct(productId, prod.price);
      return res.redirect("/cart");
    });
  };
}

const shopController = new ShopController();
export default shopController;
