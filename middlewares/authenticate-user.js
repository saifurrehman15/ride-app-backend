import sendResponse from "../helper/response-helper.js";
import jwt from "jsonwebtoken";

const authenticateUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    console.log(authorization);

    const bearerToken = authorization.split(" ")[1];
    if (!bearerToken) {
      sendResponse(res, 403, "Token is not provide", [], true);
    }

    const decoded = jwt.verify(bearerToken, process.env.AUTH_KEY);
    if (!decoded) {
      sendResponse(res, 403, "Unauthorized token", [], true);
    }
    console.log("decoded=>", decoded);

    req.user = decoded;
    
    next();
  } catch (error) {
    console.log(error);

    sendResponse(res, 500, error || "Internal server error", [], true);
  }
};

export default authenticateUser;
