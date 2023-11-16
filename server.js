import cors from 'cors';
import { config } from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';
import router from "./route/index.js";
config();
const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);
app.use(cors())
app.use(express.static(__dirname + "/client"))
app.use(express.json())
app.use("/api", router)
app.use("/*", (req, res) => {
    res.sendFile(__dirname + "/client/index.html")
})

mongoose.connect(process.env.DB_ADDRESS).then(() => {
    console.log("db connected")
  
    seedData()
    app.listen(process.env.PORT, () => {
        console.log(`app listen to port ${process.env.PORT}`)
    })
}).catch(err => {
    console.log(err)
})

function seedData(){
  // seedExpertise()
    // seedDoctors(200)
}



