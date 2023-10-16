import Sequelize from "sequelize";
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
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: Sequelize.STRING,
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default Product;
