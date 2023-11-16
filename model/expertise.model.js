import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
    title: {type: String, required: true},
})

export default model("expertise", schema)
