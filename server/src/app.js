import express from "express";
import apiRoute from "./utils/api.js";
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import { DB_CONNECT } from "./utils/constants.js";


const app = express();

try {
    await mongoose.connect(DB_CONNECT );
    console.log("Connected to MongoDB");
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}


const PORT = 8000;

app.use(express.json())

app.use('/api/',apiRoute)

app.listen(PORT , ()=>console.log(`server is running on port  ${PORT}`));


