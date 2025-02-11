import sendResponse from "../../../helper/response-helper.js";
import { RideRequest } from "../../../models/ride-request/ride-request";

const sendRideRequest = async (req, res) => {};

// For cancelling ride
const cancelRide = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) sendResponse(res, 400, "The Id is not provided", [], true);
    const rideRequest = await RideRequest.findOneAndDelete({ _id: id });

    if (!rideRequest) sendResponse(res, 403, "Failed to cancel ride", [], true);

    sendResponse(res, 201, "You have cancelled the ride", [], true);
  } catch (error) {
    sendResponse(res, 500, error || "Internal server error", [], true);
  }
};

const getRiders = async (req, res) => {
  
};
const getWithLocation = async (req, res) => {
    const { lat, lon } = req.query;

};

export { sendRideRequest, cancelRide, getRiders, getWithLocation };
