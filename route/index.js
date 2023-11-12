import {Router} from "express";
import authRoute from "./auth.route.js";
import expertiseRoute from "./expertise.route.js";
import appointmentTimeRoute from "./appointmentTime.route.js";
import patientRoute from "./patient.route.js";

const router = Router()

router.use("/auth", authRoute)
router.use("/expertise", expertiseRoute)
router.use("/appointmentTime", appointmentTimeRoute)
router.use("/patient", patientRoute)

export default router;
