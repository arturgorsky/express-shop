import cart from "./cart";
import database from "../util/database";
import { FieldPacket, ResultSetHeader, RowDataPacket } from "mysql2";

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

  save() {
    return database.execute(
      "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    ) as unknown as Promise<ResultSetHeader[]>;
  }

  static async fetchAll(): Promise<[Product[], FieldPacket[]]> {
    return (await database.execute(
      "SELECT * FROM products"
    )) as unknown as Promise<[Product[], FieldPacket[]]>;
  }

  static findById(productId: string): Promise<[Product[], FieldPacket[]]> {
    console.log(productId);
    return database.execute("SELECT * FROM products WHERE products.id=?", [
      productId,
    ]) as unknown as Promise<[Product[], FieldPacket[]]>;
  }

  static deleteById(productId: string): void {}
}
