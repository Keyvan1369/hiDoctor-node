import appointmentModel from "../model/appointment.model.js";
import appointmentTimeModel from "../model/appointmentTime.model.js";
import ExpertiseModel from "../model/expertise.model.js";
import User, { ROLES } from "../model/user.model.js";

export default class PatientController {
  async search(req, res) {
    const { search, } = req.query;
    const limit = +(req.query.limit || 10);
    const doctors = await User.find({
      role: ROLES.DOCTOR,
      "setting.active": true,
      $or: [
        {
          fullName: {
            $regex: new RegExp(search, "i"),
          },
        },
        {
          username: {
            $regex: new RegExp(search, "i"),
          },
        },
      ],
    }).limit(limit);
    const expertiseList = await ExpertiseModel.find({
      title: {
        $regex: new RegExp(search, "i"),
      },
    }).limit(limit);
    res.send({ expertiseList, doctors });
  }

  async searchDoctorByExpertise(req, res) {
    const { expertise } = req.params;
    const users = await User.find({
      role: ROLES.DOCTOR,
      "setting.expertise": expertise,
      "setting.active": true,
    }).populate("setting.expertise");
    res.send(users);
  }

  async getDoctorDetail(req, res) {
    const { id } = req.params;
    const doctor = await User.findById(id).populate("setting.expertise");

    res.send(doctor);
  }

  async getDoctorTimes(req, res) {
    const { date } = req.query;
    const { id: doctorId } = req.params;
    const doctor = await User.findById(doctorId);
    if (!doctor) return res.status(400).send({ message: "Doctor not found" });

    const times = await appointmentTimeModel
      .find({ date, doctor: doctorId })
      .lean();

    const appointments = await appointmentModel
      .find({ date, doctor: doctorId })
      .lean();

    const freeTimes = times.map((time) => {
      return {
        ...time,
        free: !appointments.some(
          (item) => item.appointment.toString() === time._id.toString()
        ),
      };
    });

    res.send(freeTimes);
  }

  async getAppointments(req, res) {
    const patient = req.user.userId;
    const { date } = req.params;
    const appointments = await appointmentModel
      .find({ patient, date })
      .populate("doctor");
    res.send(appointments);
  }
}
