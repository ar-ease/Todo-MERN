import express from "express";
import  { apiRoute , apiProtected } from "./utils/api.js";
import mongoose from 'mongoose'
import { DB_CONNECT } from "./utils/constants.js";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";

const PORT = 8000;


const app = express();

try {
    await mongoose.connect(DB_CONNECT );
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}



app.use(express.json())

app.use('/api/',apiRoute);
app.use('/api/',AuthMiddleware,apiProtected);

app.listen(PORT , ()=>console.log(`server is running on port  ${PORT}`));


