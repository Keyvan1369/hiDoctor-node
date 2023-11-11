import express from "express";
import {config} from 'dotenv'
import router from "./route/index.js";
import mongoose from "mongoose";
import cors from 'cors'

config();
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", router)

mongoose.connect(process.env.DB_ADDRESS).then(() => {
    console.log("db connected")
    // seedExpertise()
    app.listen(process.env.PORT, () => {
        console.log(`app listen to port ${process.env.PORT}`)
    })


}).catch(err => {
    console.log(err)
})




