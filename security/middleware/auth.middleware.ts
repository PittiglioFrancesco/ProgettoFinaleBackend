import { NextFunction, Request, Response } from "express";
import AuthenticationError from "../error/AuthenticationError";
import { JwtPayloadId } from "../types/security";
import { verify } from "../services/jwt.service";

const authMiddleware = (req: Request, resp: Response, next: NextFunction) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        throw new AuthenticationError("Authorization Header not found");
    }

    if(!authHeader.includes("Bearer ")) {
        throw new AuthenticationError("Authentication schema not valid");
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const payload: JwtPayloadId = verify(token);

        req.principal = {
            id: payload.id,
            email: payload.email,
        };

        next();
    } catch (e: any) {
        throw new AuthenticationError(e.message);
    }
}



export {authMiddleware};