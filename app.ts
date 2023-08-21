import path from "path";
import express from "express";
import bodyParser from "body-parser";
import { adminRouter } from "./routes/admin";

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRouter);
app.use(shopRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .render("404", { pageTitle: "Page Not Found", path: "/undefined" });
});

app.listen(3000);
