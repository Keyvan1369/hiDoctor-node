import {Router} from "express";
import authRoute from "./auth.route.js";
import expertiseRoute from "./expertise.route.js";
import appointmentTimeRoute from "./appointmentTime.route.js";

const router = Router()

router.use("/auth", authRoute)
router.use("/expertise", expertiseRoute)
router.use("/appointmentTime", appointmentTimeRoute)

export default router;
