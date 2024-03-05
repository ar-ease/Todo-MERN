import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js"
import { statuscode } from "../utils/constants.js"
import User from "../models/User.js";
import Todo from "../models/Todo.js";


export const createTodo = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json(jsonGenerate(statuscode.VALIDATION_ERROR,"Todo is required", errors.mapped()))
    }
    try {
        const result = await Todo.create({
            userId : req.userId,
            desc : req.body.desc,
        })
        if(result){
            const user = await User.findOneAndUpdate(
                {_id: req.userId},
                {$push: {todos:result}
               } );
               return res.json(jsonGenerate(statuscode.SUCCESS,"Todo created successfully",result))
        }
    } catch (error) {
        return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY,"Something went wrong",result))

        
    }
    
}