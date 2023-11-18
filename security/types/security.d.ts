import { Express } from "express-serve-static-core";
import { JwtPayload } from "jsonwebtoken";

export interface JwtPayloadId {
    id: number,
    email: string
    roles: string[]
}

export interface Principal {
    id: number,
    email: string,
    roles?: string[]
}

declare module "express-serve-static-core" {
    interface Request{
        principal: Principal
    }
}