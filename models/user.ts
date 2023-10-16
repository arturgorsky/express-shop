import Sequelize from "sequelize";
import sequelizeInstance from "../util/database";

const User = sequelizeInstance.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
});

export default User;
