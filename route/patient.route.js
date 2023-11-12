import { Router } from "express";
import PatientController from "../controller/patient.controller.js";

const router = Router()
const controller = new PatientController();


router.get("/search", controller.search)
router.get("/searchDoctors/:expertise", controller.searchDoctorByExpertise)

export default router;
