import express from "express";

import authMiddleware
    from "../../middleware/auth.middleware.js";

import {
    getProfile,
    getDashboard
} from "./customer.controller.js";


const router = express.Router();


router.get(
    "/dashboard",
    authMiddleware,
    getDashboard
);


router.get(
    "/profile",
    authMiddleware,
    getProfile
);


export default router;