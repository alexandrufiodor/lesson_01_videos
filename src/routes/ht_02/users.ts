import {Request} from "express";
const basicAuth = require("express-basic-auth");

const getUnauthorizedResponse = (req: Request) => {
    return "Unauthorized";
}

const authOptions = {
    challenge: true,
    users: {"admin": "qwerty"},
    authorizeAsync: false,
    unauthorizedResponse: getUnauthorizedResponse,
};

export const authorization = () => {
    return basicAuth(authOptions)
}
