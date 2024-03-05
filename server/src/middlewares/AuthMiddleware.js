import { JWT_TOKEN_SECRET, statuscode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import Jwt  from "jsonwebtoken";
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */ 
const AuthMiddleware = (req,res,next)=>{
    if(req.headers['auth'] == undefined){

        return res.json(jsonGenerate(statuscode.AUTH_ERROR,"Access Denied")); 
    }
    const token = req.headers['auth'];
    try{
        const decoded = Jwt.verify(token,JWT_TOKEN_SECRET);
        console.log("decoded token : ",decoded);
        


        req.userId = decoded.userId;
        console.log(req.userId)
    
        return next();
    }
    catch(error){
        console.log("Error message : ",error.message);

        return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY,"Invalid Token"))
    }

}

export default AuthMiddleware;