import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoute from './routes/product.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();

const connect = async(req, res) => {
    const url = process.env.MONGO_DB
    try {
        await mongoose.connect(url);
    } catch (error) {
        console.log(error);
    }
};

mongoose.connection.on("disconnected", ()=>{
    console.log("mongodb disconnected");
});

mongoose.connection.on("connected", ()=>{
    console.log("mongodb connected");
});

app.get('/', (req, res)=>{
    res.send("hello first request")
})

//middlewares

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api/auth", authRoutes)
app.use("/api/product", productRoute)

app.listen(3001, ()=> {
    connect()
    console.log("connected to backend");
})

