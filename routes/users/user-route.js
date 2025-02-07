import express from "express";

import {
  allUsers,
  deleteUser,
  singleUser,
  updateUser,
} from "../../controller/users/users.js";

import authenticateUser from "../../middlewares/authenticate-user.js";

const router = express();
console.log("runs");

// single user
router.get("/singleUserGet", authenticateUser, singleUser);

// all users
router.get("/userGet", allUsers);

// delete user
router.delete("/delete-user", authenticateUser, deleteUser);

// update user
router.put("/update-user", authenticateUser, updateUser);

export default router;
