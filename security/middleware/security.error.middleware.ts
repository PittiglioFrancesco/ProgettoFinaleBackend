import { NextFunction, Request, Response } from "express";
import AuthenticationError from "../error/AuthenticationError";
import AuthorizationError from "../error/AuthorizationError";

const errorHandler = (
  err: Error,
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  
  if (err instanceof AuthenticationError) {
    resp.status(401); // Unauthorized
    resp.send({
      type: err.name,
      message: err.message,
    });
  }

  if (err instanceof AuthorizationError) {
    resp.status(403); // Forbidden
    resp.send({
      type: err.name,
      message: err.message,
    });
  }

  
  next(err);
};

export default errorHandler;
