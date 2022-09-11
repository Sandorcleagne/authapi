import express from "express";
const router = express.Router();
import saveUserData from "../controllers/saveuserdata.js";
import loginapi from "../controllers/loginuserauth.js";

//public Routes
router.post("/register", saveUserData);
router.post("/login", loginapi);

//Protected Route

export default router;
