import express, { Router } from "express";
import { sign } from "../services/jwt.service";
import { JwtPayloadId } from "../types/security";


// usare .env
// const secretKey = "mySecretKeymySecretKeymySecretKeymySecretKey";

const router : Router = express.Router();

router.use(express.json());

router.put("/api/v1/register", (req, resp) => {
    const {email, password} = req.body;

    const foundUser = {
        id:1,
        firstname: "",
        lastname: "",
        email: "",
        roles: [
            "read",
            "create"
        ]
    };


    const payload: JwtPayloadId = {
        id: foundUser.id,
        email: foundUser.email,
    };

    const token = sign(payload);

    resp.status(200);
    resp.send({
        token: token
    })
})









export default router;