
import { verifyJWT } from "../utils/jwt.js";

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    let authToken;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        authToken = authHeader.split(" ")[1]
    } else {
        const cookie = req.headers.cookie;
        if (!cookie) return res.status(401).send("User Unauthorized")
        authToken = cookie.split("=")[1];
    }


    verifyJWT(authToken).then((data) => {

        req.user = data;

        next();
    }).catch(() => {
        res.status(404).send("Invalid token.")
    })



}

export default auth;