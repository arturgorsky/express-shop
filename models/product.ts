import sequelize from "sequelize";
import sequelizeInstance from "../util/database";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

const Product = sequelizeInstance.define("product", {
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: sequelize.STRING,
  price: {
    type: sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

export default Product;
