import sendResponse from "../../helper/response-helper";
import { userModel } from "../../models/auth/auth-model";

const riderFind = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    const rider = await userModel.find({ role: "rider" });
    if (!rider) {
      sendResponse(res, 403, "There are no riders", rider, true);
    }

    sendResponse(res, 201, "riders around you found", rider, false);
  } catch (error) {
    sendResponse(res, 500, error || "Internal server error", true);
  }
};

export default riderFind;
