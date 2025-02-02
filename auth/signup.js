import express from "express";
const router = express();
import Joi from "joi";
import { userModel } from "../models/auth/auth-model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const validateSchema = Joi.object({
  userName: Joi.string().trim().min(3).required(),
  phone: Joi.string()
    .pattern(/^[0-9]{11}$/)
    .required(),
  pin: Joi.string().max(6).required(),
});

router.post("/", async (req, res) => {
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

    return res.status(201).json({
      error: false,
      message: "The User registered successfully",
      data: { token, user: newUser },
    });
  } catch (error) {
    return res.status(504).json({
      error: true,
      message: "Internal server error",
    });
  }
});

export default router;
