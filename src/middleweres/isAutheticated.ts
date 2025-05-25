import { NextFunction, Response, Request } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
    sub: string
}

export function MiddlewareAuth(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization

    if (!authToken) {
        res.status(401).json({ Message: "Error" })
    }

    const [, token] = authToken.split(" ")


    try {

        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad


        req.user_id = sub

        return next()


    } catch (err) {
        res.status(401).json({ Message: "Error" })
    }
}