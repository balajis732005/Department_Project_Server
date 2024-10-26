import express from "express";
const app = express();

import dotenv from "dotenv";
dotenv.config();

app.use(express.json());

import connectToMongoDb from "./database/db.js";

const port = process.env.PORT;

import userRouter from "./router/userRouter.js";
app.use("/cit",userRouter);

app.use(express.urlencoded({ extended: true }));

const main = async() => {
    try{
        await connectToMongoDb(process.env.MONGODB_CONNECTION_STRING);
        console.log("MONGODB CONNECTED SUCCESSFULLY!");
        app.listen(port, () => {
            console.log(`SERVER IS RUNNING ON PORT ${port}`);
        })
    } catch(error) {
        console.log(error);
    }
}

main();