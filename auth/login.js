import express from "express";
import Joi from "joi";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userModel } from "../models/auth/auth-model.js";

const router = express();

const validateSchema = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required(),
  pin: Joi.string().max(6).required(),
});

router.post("/", async (req, res) => {
  try {
    const { error, value } = validateSchema.validate(req.body);
    console.log(error, value);

    if (error) {
      return res.status(403).json({
        error: true,
        message: error.message,
      });
    }
    const isUserExist = await userModel.findOne({ phone: value.phone });

    if (!isUserExist) {
      return res.status(403).json({
        error: true,
        message: "The user is not exist",
      });
    }

    let isPinCorrect = await bcrypt.compare(value.pin, isUserExist.pin);

    if (!isPinCorrect) {
      return res.status(403).json({
        error: true,
        message: "The pin is not correct",
      });
    }

    const token = jwt.sign({ ...isUserExist }, process.env.AUTH_KEY);

    return res.status(201).json({
      error: false,
      message: "User login successfully",
      data: { token, user: isUserExist },
    });
  } catch (error) {
    return res.status(504).json({
      error: true,
      message: error || "Internal server error",
    });
  }
});

export default router;
