import express from "express";
import {
  allUsers,
  deleteUser,
  singleUser,
} from "../../controller/users/users.js";
import authenticateUser from "../../middlewares/authenticate-user.js";
const router = express();
console.log("runs");

// single user
router.get("/singleUserGet", authenticateUser, singleUser);

// all users
router.get("/userGet", allUsers);

router.delete("/delete-user", authenticateUser, deleteUser);

export default router;
