import Joi from "joi";
import { userModel } from "../../models/auth/auth-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendResponse from "../../helper/response-helper.js";

const validateSchema = Joi.object({
  userName: Joi.string().trim().min(3).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required(),
  pin: Joi.string().max(6).required(),
});

const signUp = async (req, res) => {
  try {
    const { error, value } = validateSchema.validate(req.body);
    if (error) {
      return res.status(403).json({
        error: true,
        message: error.message,
      });
    }
    const isUserExist = await userModel.findOne({ phone: value.phone });
    console.log(isUserExist, value);

    if (isUserExist) {
      return res.status(404).json({
        error: true,
        message: "The user with this phone number is already exist",
      });
    }

    let hashPin = await bcrypt.hash(value.pin, 10);

    let obj = {
      userName: value.userName,
      pin: hashPin,
      phone: value.phone,
    };

    console.log(obj);

    let newUser = new userModel({ ...obj });
    newUser = await newUser.save();
    console.log(newUser);

    let token = jwt.sign({ ...newUser }, process.env.AUTH_KEY);

    sendResponse(
      res,
      201,
      "The User registered successfully",
      {
        token,
        user: newUser,
      },
      false
    );
  } catch (error) {
    sendResponse(res, 500, "Internal server error", true);
  }
};

export default signUp;
