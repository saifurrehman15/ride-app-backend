import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
// ---- Importing-Routes //
import loginAuth from "./auth/login.js";
import signUpAuth from "./auth/signup.js";
// ----- //
const app = express();
const PORT = process.env.PORT;

// ---- Others ---- //
app.use(cors());
app.use(express.json());
// ----- //

// ---- Mongodb-Connection ---- //
(async function connectDb() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MONGODB connected");
    }
  } catch (error) {
    console.log(error);
  }
})();
// ----- //

// ---- Public-Routes ---- //
app.get("/", (req, res) => {
  res.send("Severs is running on " + PORT);
});
// ----- //

// ---- Private-Routes ---- //

// ----- //

// ---- Auth-Routes ---- //
app.use("/auth/login", loginAuth);
app.use("/auth/signup", signUpAuth);
// ----- //

// ---- User-Routes ---- //

// ----- //

// ---- Server-Listening / Server Running ---- //
app.listen(PORT, () => console.log("Sever is running on " + PORT));

