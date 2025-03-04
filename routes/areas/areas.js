import express from "express";
import areaFind from "../../controller/areaFind/area-find.js";

const router = express.Router();

router.get("/areas-find", areaFind);

export default router;
