import express from "express";
import authenticateUser from "../../middlewares/authenticate-user.js";
import {
  cancelRide,
  getWithLocation,
  sendRideRequest,
} from "../../controller/rides/user-logics/ride-req.js";
import { acceptRequest } from "../../controller/rides/riders-logic/ride-req.js";

const router = express.Router();

// send ride request
router.post("/ride-request", sendRideRequest);

// accept request
router.put("/ride-request-accept", authenticateUser, acceptRequest);

// cancel request
router.delete("/ride-request-cancel", authenticateUser, cancelRide);

// // get all riders
// router.get("/get-riders", authenticateUser, getRiders);

// get riders with loc
router.get("/loc-get-riders", authenticateUser, getWithLocation);

export default router;
