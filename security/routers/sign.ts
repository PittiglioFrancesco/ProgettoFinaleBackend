import express, { NextFunction, Router } from "express";
import { sign } from "../services/jwt.service";
import {register, login } from "../services/auth.service";
import { JwtPayloadId } from "../types/security";
import AuthenticationError from "../error/AuthenticationError";


const router: Router = express.Router();

router.use(express.json());

router.post("/api/v1/signup", async (req, resp, next: NextFunction) => {
  const { username, email, password, birthdate } = req.body;

  const newProfile = await register(username, email, password, birthdate);

  if (!newProfile) {
    next(new AuthenticationError("Email o password errati"));
  }

  const payload: JwtPayloadId = {
    id: newProfile.id,
    email: newProfile.email,
  };

  const token = sign(payload);

  resp.status(200);
  resp.send({
    token: token,
  });
});

router.put("/api/v1/login", async (req, resp, next: NextFunction) => {
  const { email, password } = req.body;

  const foundUser = await login(email, password);

  if (!foundUser) {
    next(new AuthenticationError("Email o password errati"));
  }

  if (foundUser) {
    const payload: JwtPayloadId = {
      id: foundUser.id,
      email: foundUser.email,
    };

    const token = sign(payload);

    resp.status(200);
    resp.send({
      token: token,
    });
  }
});

export default router;
