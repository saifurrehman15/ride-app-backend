import Joi from "joi";
import sendResponse from "../../../helper/response-helper.js";
import { RideRequest } from "../../../models/ride-request/ride-request.js";

const validateSchema = Joi.object({
  userId: Joi.string().required(),
  pickUp: Joi.string().required(),
  dropOff: Joi.string().required(),
  fare: Joi.number().min(100).required(),
  action: Joi.string()
    .valid("pending", "cancelled", "accept")
    .default("pending"),
});

// For handeling ride booking
const sendRideRequest = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    const { error, value } = validateSchema.validate(req.body);
    if (error) sendResponse(res, 403, error.message, [], true);

    let rideSave = new RideRequest({ ...value });
    rideSave = await rideSave.save();

    if (!rideSave) sendResponse(res, 403, "Ride booking failed!", [], true);

    sendResponse(res, 201, "The Ride booked successfully!", rideSave, false);
  } catch (error) {
    sendResponse(res, 500, error || "Internal server error!", [], true);
  }
};

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

//For getting with location
const getWithLocation = async (req, res) => {};

export { sendRideRequest, cancelRide, getWithLocation };
