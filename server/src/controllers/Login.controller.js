import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helper.js";
import { JWT_TOKEN_SECRET, statuscode } from "../utils/constants.js";
import  Jwt  from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from 'bcrypt'

export const login = async(req,res)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
  const {username ,password} = req.body;
  const user  = await User.findOne({username : username});

  if(!user){
   return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY,"username or password is incorrect"))
  }
  const verified = bcrypt.compareSync(password,user.password);
  if(!verified){
    return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY,"username or password is incorrect"))
}
        const token = Jwt.sign({userId : user._id},JWT_TOKEN_SECRET)
        return res.json(jsonGenerate(statuscode.SUCCESS,"Login Successful",{userId : user._id,token:token}))
  } 
  res.json(jsonGenerate(statuscode.VALIDATION_ERROR,"validation error",errors.mapped()))
}

