import sendResponse from "../../helper/response-helper.js";
import { userModel } from "../../models/auth/auth-model.js";

// all user find
const allUsers = async (req, res) => {
  try {
    const { page, limit } = req.query;
    let skip = page - 1 || "";
    skip = skip * limit || "";
    let limitPerPage = page * limit || "";
    const users = await userModel.find().skip(skip).limit(limitPerPage);
    if (!users) {
      sendResponse(res, 403, "There are no users to show", [], true);
    }
    sendResponse(res, 200, "Users fetched successfully", users, false);
  } catch (error) {
    sendResponse(res, 500, error || "Internal server error", [], true);
  }
};

// single user find
const singleUser = async (req, res) => {
  try {
    const { _id } = req.user;
    const singleUser = await userModel.findOne(_id).lean();
    sendResponse(res, 200, "User fetched successfully", singleUser, false);
  } catch (error) {
    sendResponse(res, 500, "Internal server error", [], true);
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const { _id } = req.user._doc;
    console.log("requested=>", _id);
    const deleteUser = await userModel.findOneAndDelete({ _id: _id });
    if (!deleteUser) {
      sendResponse(res, 403, "Unable to delete user", [], true);
    }
    sendResponse(res, 200, "User deleted successfully", deleteUser, false);
  } catch (error) {
    sendResponse(res, 500, error || "Internal server error", [], true);
  }
};

export { allUsers, singleUser, deleteUser };
