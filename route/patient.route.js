import { Router } from "express";
import PatientController from "../controller/patient.controller.js";

const router = Router()
const controller = new PatientController();

router.get("/search", controller.search)


export default router;
