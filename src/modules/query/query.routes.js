import express from "express";

import authMiddleware
    from "../../middleware/auth.middleware.js";

import {
    getQueryHistory,
    getQueryDetails,
    createQuery
} from "./query.controller.js";


const router = express.Router();


router.get(
    "/history",
    authMiddleware,
    getQueryHistory
);


router.get(
    "/:id",
    authMiddleware,
    getQueryDetails
);

router.post(
    "/",
    authMiddleware,
    createQuery
);


export default router;