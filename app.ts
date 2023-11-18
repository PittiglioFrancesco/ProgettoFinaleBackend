import "dotenv/config";

import express, { Application, NextFunction } from "express";
import errorHandler from "./security/middleware/security.error.middleware";

import { authMiddleware } from "./security/middleware/auth.middleware";

import signRouter from "./security/routers/sign";

const app: Application = express();

app.use(signRouter);

app.get("/", (req, resp, next: NextFunction) => {
  const user = {};

  resp.status(200);
  resp.send(user);
});

app.use(errorHandler);

app.listen(8080);
