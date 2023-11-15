import { Router } from "express";
import PatientController from "../controller/patient.controller.js";
import { role } from "../middleware/role.js";
import { ROLES } from "../model/user.model.js";
import { auth } from "../middleware/auth.js";

const router = Router();
const controller = new PatientController();

router.get("/search", controller.search);
router.get("/searchDoctors/:expertise", controller.searchDoctorByExpertise);
router.get("/getDoctorDetail/:id", controller.getDoctorDetail);
router.get("/getDoctorTimes/:id", controller.getDoctorTimes);
router.get(
  "/appointments/:date",
  auth,
  role(ROLES.PATIENT),
  controller.getAppointments
);

export default router;
