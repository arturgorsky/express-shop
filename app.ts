import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { adminRoutes } from "./routes/admin";
import { shopRoutes } from "./routes/shop";
import uiController from "./controllers/uiController";
import sequelizeInstance from "./util/database";
import Product from "./models/product";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(uiController.get404Page);
console.log(Product);
sequelizeInstance
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => console.log(err));
