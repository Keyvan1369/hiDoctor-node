import {Router} from "express";
import AppointmentTimeController from "../controller/appointmentTime.controller.js";
import {auth} from "../middleware/auth.js";
import {role} from "../middleware/role.js";
import {ROLES} from "../model/user.model.js";

const router = Router()
const controller = new AppointmentTimeController();

router.get("/:date",auth,role(ROLES.DOCTOR), controller.getAll)
router.post("/",auth,role(ROLES.DOCTOR), controller.create);


export default router;
