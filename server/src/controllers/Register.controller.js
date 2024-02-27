
import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { statuscode,JWT_TOKEN_SECRET} from "../utils/constants.js";
import bcrypt from 'bcrypt';
import User from "../models/User.js";
import Jwt from 'jsonwebtoken';

const Register = async (req, res)=>{

    const errors = validationResult(req);
    

        if(errors.isEmpty())
        {
        const {name , username, password , email} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword =  await bcrypt.hash(password,salt)

     // saving to db
     const userExist = await User.findOne({ $or : [{
        email: email
     },{
        username : username
     }]});
     if(userExist){
        return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY,"Sorry..this is already exist"))
     }
            try {
                const result = await User.create({
                    name : name,
                    email : email,
                    password : hashedPassword,
                    username : username
                })

                const token = Jwt.sign({userId: result._id},JWT_TOKEN_SECRET)

                res.json(jsonGenerate(statuscode.SUCCESS,"Registration successful", {userId : result._id,token:token}))
            } catch (error) {
                console.log(error);
                res.status(500).json(jsonGenerate(statuscode.SERVER_ERROR,"Internal server error",null))
            }     
         }
         else{
            res.json(jsonGenerate(statuscode.VALIDATION_ERROR,"OOPS...validation error", errors.mapped()))
        }
    }
export default Register;