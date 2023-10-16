import path from "path";
import express, { Request } from "express";
import bodyParser from "body-parser";
import { adminRoutes } from "./routes/admin";
import { shopRoutes } from "./routes/shop";
import uiController from "./controllers/uiController";
import sequelizeInstance from "./util/database";
import Product from "./models/product";
import User from "./models/user";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req: Request, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.body.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// Sequelize Associations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

app.use(uiController.get404Page);
console.log(Product);
sequelizeInstance
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      User.create({ name: "Artur", email: "test@test@gmail.com" });
    }
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
