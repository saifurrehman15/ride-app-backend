import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userModel } from "../../models/auth/auth-model.js";
import sendResponse from "../../helper/response-helper.js";

const validateSchema = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required(),
  pin: Joi.string().max(6).required(),
});

const login = async (req, res) => {
  try {
    const { error, value } = validateSchema.validate(req.body);
    console.log(error, value);

    if (error) sendResponse(res, 403, error.message, [], true);

    const isUserExist = await userModel.findOne({ phone: value.phone });

    if (!isUserExist) {
      return res.status(403).json({
        error: true,
        message: "The user is not exist",
      });
    }

    let isPinCorrect = await bcrypt.compare(value.pin, isUserExist.pin);

    if (!isPinCorrect)
      sendResponse(res, 403, "The pin is not correct", [], true);

    const token = jwt.sign({ ...isUserExist }, process.env.AUTH_KEY);
    sendResponse(
      res,
      201,
      "User login successfully",
      { token, user: isUserExist },
      false
    );
  } catch (error) {
    sendResponse(res, 500, error || "Internal server error", [], true);
  }
};

export default login;
