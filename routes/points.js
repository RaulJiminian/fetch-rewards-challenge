import { Router } from "express";
import * as controllers from "../controllers/points.js";

const router = Router();

router.post("/points", controllers.addPoints);
router.post("/points/spend", controllers.spendPoints);
router.get("/points", controllers.getPoints);

export default router;
