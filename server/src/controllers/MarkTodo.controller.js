import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helper.js";
import { statuscode } from "../utils/constants.js";
import Todo from "../models/Todo.js";

export const MarkTodo = async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerate(statuscode.VALIDATION_ERROR,"todo id is required",error.mapped()))
    }
    try {
        const todo = await Todo.findOneAndUpdate({
            _id : req.body.todo_id,
            userId : req.userId
        },[
           {
            $set: {
                isCompleted : {$eq : [false, "$isCompleted"]} 
            }
           } 
        ]

        )
        if(todo){
            return res.json(jsonGenerate(statuscode.SUCCESS,"updated", todo))
        }
    } catch (error) {
        return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY,"could not update", null))

        
    }
}