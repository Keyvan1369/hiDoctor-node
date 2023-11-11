import {Router} from "express";
import ExpertiseController from "../controller/expertise.controller.js";

const router = Router()
const controller = new ExpertiseController();

router.get("/", controller.getAll)


export default router;
