import {Router} from "express";
import AuthController from "../controller/auth.controller.js";
import {auth} from "../middleware/auth.js";
import {role} from "../middleware/role.js";
import {ROLES} from "../model/user.model.js";

const router = Router()
const controller = new AuthController();

router.post("/login", controller.login)
router.post("/register", controller.register)
router.put("/update", auth, role(ROLES.DOCTOR), controller.updateSetting)
router.get("/profile", auth, controller.getProfile)


export default router;
