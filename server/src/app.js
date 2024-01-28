import express from "express";
import apiRoute from "./utils/api.js";
import bodyParser from 'body-parser';
// import mongoose from 'mongoose'


const app = express();

// mongoose.connect("",{useNewUrlParse : true});

const PORT = 8000;

app.use(bodyParser.json())

app.use('/api/',apiRoute)

app.listen(PORT , ()=>console.log(`server is running on port  ${PORT}`));

