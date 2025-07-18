import { Router } from "express";
import employeeAppRoutes from "./employeeAppRoutes/employeeAppRoutes.js";
import consumerAppRoutes from "./consumerAppRoutes/consumerAppRoutes.js";
import sellerAppRoutes from "./sellerAppRoutes/sellerAppRoutes.js";

const router = Router();

router.use('/employeeApp', employeeAppRoutes);
router.use('/customerApp', consumerAppRoutes);
router.use('/sellerApp', sellerAppRoutes);

export default router;
