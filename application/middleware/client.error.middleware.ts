import { NextFunction, Request, Response } from "express";
import NotFoundError from "../error/NotFoundError";

const errorHandler = (
    err: Error,
    req: Request,
    resp: Response,
    next: NextFunction
) => {

    if (err instanceof NotFoundError) {
        resp.status(404);
        resp.send({
            type: err.name,
            message: err.message
        })
    }
}

export default errorHandler;