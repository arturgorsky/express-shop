import fs from "fs";
import path from "path";
import { rootDir } from "../util/path";

const products: Array<Product> = [];

export const getProductsFromFile = (callback: (product: Product[]) => void) => {
  const filePath = path.join(rootDir, "data", "products.json");

  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent.toString()));
    }
  });
};

export default class Product {
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  id: string;

  constructor(
    id: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
  ) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(): void {
    const filePath = path.join(rootDir, "data", "products.json");

    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (prod) => prod.id === this.id
        );

        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
          err && console.log("product:", err);
        });
        products = updatedProducts;
      } else {
        this.id = Math.random().toString();
        fs.writeFile(filePath, JSON.stringify(products), (err) => {
          err && console.log("product:", err);
        });
        products.push(this);
      }
    });

    products.push(this);
  }

  static fetchAll(callback: (products: Product[]) => void): void {
    getProductsFromFile(callback);
  }

  static findById(
    productId: string,
    callback: (product: Product) => void
  ): void {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === productId);
      if (product) {
        callback(product);
      }
    });
  }
}
