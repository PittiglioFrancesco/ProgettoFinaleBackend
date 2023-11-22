import express, { NextFunction, Router } from "express";
import { authMiddleware } from "../../security/middleware/auth.middleware";
import {
  createPost,
  deletePost,
  readAllPosts,
  readAllPostsOfProfile,
  readPostById,
  updatePost,
} from "../services/post.service";
import AuthorizationError from "../../security/error/AuthorizationError";
import NotFoundError from "../error/NotFoundError";

const router: Router = express.Router();

router.use(express.json());

router.post(
  "/api/v1/post",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    if (!req.query.id) {
      next(new AuthorizationError("Errore inaspettato, ricaricare la pagina"));
    }

    if (req.query.id !== req.body.id) {
      next(new AuthorizationError("Non autorizzato"));
    }

    if (req.query.id) {
      const authorId = +req.query.id;

      const { createdAt, description } = req.body;

      const newPost = await createPost(authorId, createdAt, description);

      resp.status(200);
      resp.send(newPost);
    }
  }
);

router.get(
  "/api/v1/post",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    const posts = await readAllPosts();

    if (!posts) {
      next(new NotFoundError("Nessun post trovato"));
    }

    resp.status(200);
    resp.send(posts);
  }
);

router.get(
  "/api/v1/post/:id",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    const id = +req.params.id;

    const foundPost = await readPostById(id);

    if (!foundPost) {
      next(new NotFoundError("Post non trovato"));
    }

    resp.status(200);
    resp.send(foundPost);
  }
);

router.get(
  "/api/v1/profileposts",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    const id = +req.body.id;

    const foundPosts = await readAllPostsOfProfile(id);

    if (!foundPosts) {
      next(new NotFoundError("Post non trovato"));
    }

    resp.status(200);
    resp.send(foundPosts);
  }
);

router.put(
  "/api/v1/post/:id",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    const { description } = req.body;
    const id = +req.params.id;

    const updatedPost = await updatePost(id, description);

    if (!updatedPost) {
      next(new NotFoundError("Post non trovato"));
    }

    resp.status(200);
    resp.send(updatedPost);
  }
);

router.delete(
  "api/v1/post/:id",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    const id = +req.params.id;

    const deletedPost = deletePost(id);

    resp.status(200);
    resp.send(deletedPost);
  }
);

export default router;
