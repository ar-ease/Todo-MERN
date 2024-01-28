import express from "express"
import Register from "../controllers/Register.controller";
const apiRoute = express.Router();

apiRoute.post('/register', (req,res)=> Register);
export default apiRoute;