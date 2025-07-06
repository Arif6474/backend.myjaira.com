import { Router } from "express";
import employeeAppRoutes from "./employeeAppRoutes/employeeAppRoutes.js";
import consumerAppRoutes from "./consumerAppRoutes/consumerAppRoutes.js";

const router = Router();

router.use('/employeeApp', employeeAppRoutes);
router.use('/consumerApp', consumerAppRoutes);

export default router;
