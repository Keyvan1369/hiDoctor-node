import {model, Schema} from "mongoose";

const schema = new Schema({
    title: {type: String, required: true},
})

export default model("expertise", schema)
