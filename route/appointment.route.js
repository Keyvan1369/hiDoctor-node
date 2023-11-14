import { Router } from "express";
import AppointmentController from "../controller/appointment.controller.js";
import { auth } from "../middleware/auth.js";
import { role } from "../middleware/role.js";
import { ROLES } from "../model/user.model.js";

const router = Router()
const controller = new AppointmentController();

router.post("/",auth,role(ROLES.PATIENT), controller.create);


export default router;
