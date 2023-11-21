import express, { NextFunction, Router } from "express";
import { authMiddleware } from "../../security/middleware/auth.middleware";
import {
  createPost,
  deletePost,
  readAllPosts,
  readPostById,
  updatePost,
} from "../services/post.service";

const router: Router = express.Router();

router.use(express.json());

router.post(
  "/api/v1/post",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
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

    resp.status(200);
    resp.send(foundPost);
  }
);

router.put(
  "/api/v1/post/:id",
  authMiddleware,
  async (req, resp, next: NextFunction) => {
    const { description } = req.body;
    const id = +req.params.id;

    const updatedPost = await updatePost(id, description);

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
