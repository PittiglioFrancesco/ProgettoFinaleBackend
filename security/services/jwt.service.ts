import jwt from "jsonwebtoken";
import { JwtPayloadId } from "../types/security";

const secretKey: string = process.env.SECRET_KEY as string;


function sign(payload: JwtPayloadId) {
    return jwt.sign(payload, secretKey);
}

function verify(token: string) {
    const payload = jwt.verify(token, secretKey) as JwtPayloadId;
    return payload
}

export {sign, verify};