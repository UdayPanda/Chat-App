import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoute from "./routes/AuthRoute.js";


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

const corsOptions = {
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.options("*", cors(corsOptions))

app.use(cookieParser());

app.use(express.json());

app.use('/api/auth', authRoute)

const server = app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
})


mongoose
    .connect(databaseURL)
    .then(()=> console.log("Database connected!"))
    .catch((err)=> console.log(err.messege));