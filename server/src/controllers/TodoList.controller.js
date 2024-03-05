import { statuscode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helper.js";
import User from "../models/User.js";

export const GetTodos = async(req,res) => {

    try {
        
       const list = await User.findById(req.userId)
       .select('-password')
       .populate('todos')
       .exec()
       
        
        return res.json(jsonGenerate(statuscode.SUCCESS,"All list", list))
        
    } catch (error) {
        return res.json(jsonGenerate(statuscode.UNPROCESSABLE_ENTITY,"error occured", error))
        
    }
}