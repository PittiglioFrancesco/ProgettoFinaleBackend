import express, { NextFunction, Router } from "express";
import { sign, verify } from "../services/jwt.service";
import { register, login, findUserByEmail } from "../services/auth.service";
import { JwtPayloadId } from "../types/security";
import AuthenticationError from "../error/AuthenticationError";
import {
  findProfileByUsername,
  readProfileById,
} from "../../application/services/profile.service";
import AuthorizationError from "../error/AuthorizationError";

const router: Router = express.Router();

router.use(express.json());

router.post("/api/v1/signup", async (req, resp, next: NextFunction) => {
  const { username, email, password, birthdate } = req.body;

  const foundUser = await findUserByEmail(email);
  const foundProfile = await findProfileByUsername(username);

  const newProfile = await register(username, email, password, birthdate);

  if (foundUser) {
    next(new AuthenticationError("Email già registrata ad un altro account"));
  }

  if (foundProfile) {
    next(
      new AuthenticationError("Username già registrato ad un altro account")
    );
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

    const foundProfile = await readProfileById(foundUser.id);

    resp.status(200);
    resp.send({
      token: token,
      ...foundProfile,
    });
  }
});

router.get("/api/v1/verify", async (req, resp, next: NextFunction) => {
  const { token } = req.body;

  const decodedtoken = verify(token);

  if (!decodedtoken) {
    next(new AuthorizationError("effettua il login"));
  }

  resp.status(200);
  resp.send(decodedtoken);
});

export default router;
