import { NextFunction, Request, Response } from "express";

class UiController {
  get404Page = (req: Request, res: Response, next: NextFunction) => {
    res
      .status(404)
      .render("404", { pageTitle: "Page Not Found", path: "/undefined" });
  };
}

const uiController = new UiController();
export default uiController;
