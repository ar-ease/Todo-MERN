
import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { statuscode } from "../utils/constants.js";
import bcrypt from 'bcrypt';

const Register = async (req, res)=>{

    const errors = validationResult(req);

    // if(errors.isEmpty()){
    //     const {name , username, password , email} = req.body;
    //     const salt = await bcrypt.genSalt(10);
    //     const hashPassword =  await bcrypt.hash(password,salt)

    //     password = hashPassword;

    //     //save to db
    // }
    res.json(jsonGenerate(statuscode.VALIDATION_ERROR,"OOPS...validation error", errors.mapped()))

}
export default Register;






// import { userSchema } from "../validatonSchema/RegisterSchema"

// const Register = (req, res)=>{
// try{
//     const validatedData = userSchema.parse(req.body);
//     res.json({success : true , data : validatedData})
// }
// catch(error){
//     res.stats(400).json({ success: false, error: error.errors });
// }
    
// }

// export default Register;