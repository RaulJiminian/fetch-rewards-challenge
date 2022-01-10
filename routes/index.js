import { Router } from "express";
import pointsRoutes from "./points.js";

const router = Router();

router.get("/", (req, res) => res.send("This is the api root!"));

router.use("/", pointsRoutes);

export default router;
