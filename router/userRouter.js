import express from "express";
const router = express.Router();

import userController from "../controller/userController.js";

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);

export default router;