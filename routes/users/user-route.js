import express from "express";
import { allUsers, singleUser } from "../../controller/users/users.js";
import authenticateUser from "../../middlewares/authenticate-user.js";
const router = express();
console.log("runs");

// single user
router.get("/singleUserGet", authenticateUser, singleUser);

// all users
router.get("/userGet", allUsers);

export default router;
