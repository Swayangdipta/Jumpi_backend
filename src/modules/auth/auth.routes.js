import { Router } from "express";

import * as AuthController from "./auth.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import {
    loginSchema,
    verifyOtpSchema,
    registerSchema
} from "./auth.validation.js";

const router = Router();

router.post(
    "/login",
    validate(loginSchema),
    AuthController.login
);

router.post(
    "/resend-otp",
    validate(loginSchema),
    AuthController.resendOtp
);

router.post(
    "/verify-otp",
    validate(verifyOtpSchema),
    AuthController.verifyOtp
);

router.post(
    "/register",
    (req, res, next) => {
        console.log("hitting register route");
        console.log("req.body: ", req.body);
        next();
    },
    // validate(registerSchema),
    AuthController.register
);

router.get(
    "/me",
    authMiddleware,
    AuthController.me
);

router.post(
    "/logout",
    authMiddleware,
    AuthController.logout
);

export default router;