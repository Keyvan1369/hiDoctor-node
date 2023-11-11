import {model, Schema} from "mongoose";

const schema = new Schema({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    from: {
        type: Number,
        required: true
    },
    to: {
        type: Number,
        required: true
    }

}, {timestamps: true})


export default model("appointmentTime", schema)
