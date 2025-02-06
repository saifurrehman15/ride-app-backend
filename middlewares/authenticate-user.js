import sendResponse from "../helper/response-helper.js";
import jwt from "jsonwebtoken";

const authenticateUser = async (req, res) => {
  try {
    const { authorization } = req.headers;
    
    const bearerToken = authorization.split(" ")[1];
    if (!bearerToken) {
      sendResponse(res, 403, "Token is not provide",[], true);
    }

    const decoded = jwt.verify(bearerToken,process.env.AUTH_KEY);
    if (!decoded) {
      sendResponse(res, 403, "Unauthorized token",[], true);
    }

    req.user = decoded;

    sendResponse(res, 200, "User fetched successfully", req.user, false);
  } catch (error) {
    console.log(error);
    
    sendResponse(res, 500, error || "Internal server error",[], true);
  }
};

export default authenticateUser;
