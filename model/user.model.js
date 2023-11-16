import mongoose from "mongoose";
const { Schema, model } = mongoose;

export const ROLES = {
  DOCTOR: "doctor",
  PATIENT: "patient",
};

const schema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: {
      type: String,
      enum: [ROLES.PATIENT, ROLES.DOCTOR],
      default: ROLES.PATIENT,
      required: true,
    },
    setting: {
      appointmentTime: Number,
      dayStartTime: String,
      dayEndTime: String,
      image: String,
      active: Boolean,
      location: {
        lat: Number,
        lng: Number,
      },
      expertise: {
        type: Schema.Types.ObjectId,
        ref: "expertise",
      },
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

schema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

export default model("user", schema);
