import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { openBooster } from "../controllers/booster.controller.js";

const boosterRouter = Router();

boosterRouter.post("/", authorize, openBooster);

export default boosterRouter;