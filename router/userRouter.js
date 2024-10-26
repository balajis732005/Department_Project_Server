import express from "express";
const router = express.Router();

import userController from "../controller/userController.js";
import studentExcelController from "../controller/studentExcelController.js"

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/student-register").post(
    studentExcelController.uploadMiddleware,
    studentExcelController.studentRegister
);

export default router;