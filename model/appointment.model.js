import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    appointment : {
        type: Schema.Types.ObjectId,
        ref: "appointmentTime",
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


export default model("appointment", schema)
