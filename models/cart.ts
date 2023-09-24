import path from "path";
import fs from "fs";
import Product from "./product";
import { rootDir } from "../util/path";

const filePath = path.join(rootDir, "data", "cart.json");

interface CartProduct {
  id: string;
  quantity: number;
}

class Cart {
  products: CartProduct[];
  totalPrice: number;

  constructor() {
    this.products = [];
    this.totalPrice = 0;
    fs.readFile(filePath, (err, fileContent) => {
      if (!err) {
        const cartContents = JSON.parse(fileContent.toString());

        this.products = cartContents.products;
        this.totalPrice = cartContents.totalPrice;
      }
    });
  }

  async addProduct(id: string, productPrice: number) {
    fs.readFile(filePath, (err, fileContent) => {
      if (!err) {
        const stringified = fileContent.toString();
        const cartContents = JSON.parse(stringified);

        this.products = cartContents.products;
        this.totalPrice = cartContents.totalPrice;
      }
    });
    const existingProduct = this.products.find((product) => product.id === id);
    let updatedProduct;

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedProduct = { id: id, quantity: 1 };
      this.products = [...this.products, updatedProduct];
    }

    this.totalPrice += +productPrice;
    fs.writeFileSync(filePath, JSON.stringify(this));
  }
}

const cart = new Cart();
export default cart;
