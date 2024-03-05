import express from "express"
import Register from "../controllers/Register.controller.js";
import { RegisterSchema } from "../validatonSchema/RegisterSchema.js";
import { LoginSchema } from "../validatonSchema/LoginSchema.js";
import { login } from "../controllers/Login.controller.js";
import { createTodo } from "../controllers/Todo.controller.js";
import { check } from "express-validator";
import { GetTodos } from "../controllers/TodoList.controller.js";
import { MarkTodo } from "../controllers/MarkTodo.controller.js";
import { RemoveTodo } from "../controllers/RemoveTodo.controller.js";
const apiRoute = express.Router();
const apiProtected = express.Router();

apiRoute.post('/register',RegisterSchema, Register);
apiRoute.post('/login',LoginSchema, login);

//protected routes;
apiProtected.post(
    "/createTodo",
    [check("desc", "Description is required").exists()],createTodo
);
apiProtected.post(
    "/marktodo",
    [check("todo_id", "todo id is required").exists()],MarkTodo
);
apiProtected.post(
    "/deletetodo",
    [check("todo_id", "todo id is required").exists()],RemoveTodo
);

apiProtected.get('/todolist',GetTodos);



export {apiRoute ,  apiProtected};