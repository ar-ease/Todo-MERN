import express from "express"
import Register from "../controllers/Register.controller.js";
import { RegisterSchema } from "../validatonSchema/RegisterSchema.js";
const apiRoute = express.Router();

apiRoute.post('/register',RegisterSchema, Register);
export default apiRoute;
