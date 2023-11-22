import express, { NextFunction, Router } from "express";
import {
  deleteProfile,
  getFirstFiveProfiles,
  readAllProfiles,
  readProfileById,
  updateProfile,
} from "../services/profile.service";
import { authMiddleware } from "../../security/middleware/auth.middleware";
import NotFoundError from "../error/NotFoundError";

const router: Router = express.Router();

router.use(express.json());

JSON.stringify(this, (key, value) =>
  typeof value === "bigint" ? value.toString() : value
);

router.get(
  "/api/v1/profile",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    const profiles = await readAllProfiles();

    if (!profiles) {
      next(new NotFoundError("Nessun profilo trovato"))
    }

    resp.status(200);
    resp.send(profiles);
  }
);

router.get(
  "/api/v1/profile/firstfive",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    const profiles = await getFirstFiveProfiles();

    if (!profiles) {
      next(new NotFoundError("Nessun profilo trovato"))
    }

    resp.status(200);
    resp.send(profiles);
  }
);

router.get(
  "/api/v1/profile/:id",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    const id = +req.params.id;

    const foundProfile = await readProfileById(id);

    if (!foundProfile) {
      next(new NotFoundError("Profilo non trovato"))
    }

    resp.status(200);
    resp.send(foundProfile);
  }
);

router.put(
  "/api/v1/profile/:id",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    const { username, birthdate } = req.body;
    const id = +req.params.id;

    const updatedProfile = await updateProfile(id, username, birthdate);

    if (!updateProfile) {
      next(new NotFoundError("Profilo non trovato"))
    }

    resp.status(200);
    resp.send(updatedProfile);
  }
);

router.delete(
  "api/v1/profile/:id",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    const id = +req.params.id;

    const deletedProfile = deleteProfile(id);

    resp.status(200);
    resp.send(deletedProfile);
  }
);

export default router;
