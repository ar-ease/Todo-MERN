import { validationResult } from "express-validator"
import { jsonGenerate } from "../utils/helper.js"
import { statuscode } from "../utils/constants.js"
import Todo from "../models/Todo.js"
import User from "../models/User.js"
export const RemoveTodo = async(req,res)=>{
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.json(jsonGenerate(statuscode.VALIDATION_ERROR, "todo id is required", error.mapped()))
    }
    try {
        const result  = await Todo.findOneAndDelete({
            userId : req.userId,
            _id : req.body.todo_id
        });
        if(result){
            const user = await User.findOneAndUpdate({
                _id : req.userId,

            },{$pull : {todos : req.body.todo_id}})
            res.json(jsonGenerate(statuscode.SUCCESS,"Todo deleted", null))
        }
        
    } catch (error) {
        res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY,"could not delete", null))

        
    }
}