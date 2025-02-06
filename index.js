import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
// ---- Importing-Routes //
import userRoute from "./routes/auth/auth.js";
import userGet from "./routes/users/user-route.js";

// ----- //
const app = express();
const PORT = process.env.PORT;

// ---- Others ---- //
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Severs is running on " + PORT);
});

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

// ---- Api-Routes ---- //
app.use("/api", userRoute);
app.use("/api", userGet);



// ---- Server-Listening / Server Running ---- //
app.listen(PORT, () => console.log("Sever is running on " + PORT));
