import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
// ---- Importing-Routes //
import authRoute from "./routes/auth/auth.js";
import userRoute from "./routes/users/user-route.js";
import singleImageRoute from "./routes/image-upload/image-upload-route.js";
import ridesRoute from "./routes/ride-requests/ride.js";
import areaLocationRoute from "./routes/areas/areas.js";

const app = express();
const PORT = process.env.PORT;

// ---- Others ---- //
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
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
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", singleImageRoute);
app.use("/api", ridesRoute);
app.use("/api", areaLocationRoute);

// ---- Server-Listening / Server Running ---- //
app.listen(PORT, () => console.log("Sever is running on " + PORT));
