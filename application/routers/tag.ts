import express, { NextFunction, Router } from "express";
import { authMiddleware } from "../../security/middleware/auth.middleware";
import { readAllTags, readTagByName } from "../services/tag.service";
import NotFoundError from "../error/NotFoundError";

const router: Router = express.Router();

router.use(express.json());

router.get(
  "/api/v1/tag",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    const tags = await readAllTags();

    if (!tags) {
      next(new NotFoundError("Nessun tag esistente"))
    }

    resp.status(200);
    resp.send(tags);
  }
);

router.get(
  "/api/v1/tag/:name",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    const name = req.params.name;
    const tag = await readTagByName(name);

    if (!tag) {
      next(new NotFoundError("Il tag non esiste"))
    }

    resp.status(200);
    resp.send(tag);
  }
);

export default router;