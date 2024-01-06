import express from "express";
import { loginBlockCheck, protect } from "../middlewares/userProtect";
import {
  authUser,
  logOutUser,
  registerUser,
} from "../controllers/usercontroller";
const router = express.Router();

router.post("/login", loginBlockCheck, authUser);
router.post("/signup", registerUser);
router.post("/logout", logOutUser);

export default router;
