import sendResponse from "../../helper/response-helper.js";
import { areasModel } from "../../models/areas/area-model.js";

const areaFind = async (req, res) => {
  try {
    const { city, skipLast, limit } = req.query;
    console.log(city);

    if (city !== "Karachi") {
      sendResponse(
        res,
        403,
        "Sorry! The services are only for Karachi",
        [],
        true
      );
    }
    
    let skip = skipLast - 1;
    skip = skip * limit || 0;
    let limitsFind = skipLast * limit || 0;

    const areas = await areasModel.find().skip(skip).limit(limitsFind);

    if (!areas) sendResponse(res, 400, "The areas are not found!", [], true);

    sendResponse(res, 201, "Areas fetched successfully", areas, false);
  } catch (error) {
    sendResponse(res, 500, error || "Internal server error", true);
  }
};

export default areaFind;
