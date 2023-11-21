import "dotenv/config";

import express, { Application, NextFunction } from "express";
import errorHandler from "./security/middleware/security.error.middleware";

import { authMiddleware } from "./security/middleware/auth.middleware";

import signRouter from "./security/routers/sign";
import profileRouter from "./application/routers/profile";
import postRouter from "./application/routers/post";
import tagRouter from "./application/routers/tag"

const app: Application = express();

app.use(signRouter, profileRouter, postRouter, tagRouter);

app.get("/", (req, resp, next: NextFunction) => {
  const user = {};

  resp.status(200);
  resp.send(user);
});

app.use(errorHandler);

app.listen(8080);
