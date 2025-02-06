import express from "express";
import signUp from "../../controller/auth/signup.js";
import login from "../../controller/auth/login.js";

const router = express();

router.post("/user/register", signUp);
router.post("/user/login", login);

export default router;