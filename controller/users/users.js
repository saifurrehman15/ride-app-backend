import sendResponse from "../../helper/response-helper.js";
import { userModel } from "../../models/auth/auth-model.js";

const allUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    let skip = page - 1;
    skip = skip * limit;
    let limitPerPage = page * limit;
    const users = await userModel.find().skip(skip).limit(limitPerPage);
    if (!users) {
      sendResponse(res, 403, "There are no users to show", [], true);
    }
    sendResponse(res, 200, "Users fetched successfully", users, false);
  } catch (error) {
    sendResponse(res, 500, error || "Internal server error", [], true);
  }
};

const singleUser = async (req, res) => {
  try {
    const { id } = req.query;
    const singleUser = await userModel.findOne({ _id: id }).lean();
    console.log(singleUser);

    sendResponse(res, 200, "User fetched successfully", singleUser, false);
  } catch (error) {
    sendResponse(res, 500, "Internal server error", [], true);
  }
};

export { allUsers, singleUser };
