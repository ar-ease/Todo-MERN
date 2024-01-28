import express from "express";
import apiRoute from "./utils/api.js";

const app = express();

const PORT = 8000;


app.listen(PORT , ()=>console.log(`server is running on port  ${PORT}`));

app.use('/api/',apiRoute)
