import { Router } from "express";
import PatientController from "../controller/patient.controller.js";

const router = Router()
const controller = new PatientController();


router.get("/search", controller.search)
router.get("/searchDoctors/:expertise", controller.searchDoctorByExpertise)
router.get("/getDoctorDetail/:id", controller.getDoctorDetail)
router.get("/getDoctorTimes/:id", controller.getDoctorTimes)

export default router;
