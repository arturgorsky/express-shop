import fs from "fs";
import path from "path";
import { rootDir } from "../util/path";

const products: Array<Product> = [];

const getProductsFromFile = (callback: (product: Product[]) => void) => {
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

  constructor(
    title: string,
    imageUrl: string,
    description: string,
    price: number
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save(): void {
    const filePath = path.join(rootDir, "data", "products.json");

    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });

    products.push(this);
  }

  static fetchAll(callback: (products: Product[]) => void): void {
    getProductsFromFile(callback);
  }
}
