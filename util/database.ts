import sequelize, { Sequelize } from "sequelize";

const sequelizeInstance = new Sequelize("node-complete", "root", "password", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelizeInstance;
