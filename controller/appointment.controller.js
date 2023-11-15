import Appointment from "../model/appointment.model.js";
import { appointmentSchema } from "../validation/appointment.validation.js";

export default class AppointmentController {
  async create(req, res) {
    try {
      const patient = req.user.userId;
      const { error } = appointmentSchema.validate(req.body);
      if (error) return res.status(401).send({ message: error.message });
      const { time, from, to, doctor, date } = req.body;

      const appointment = await Appointment.findOne({ appointment: time });
      if (appointment)
        return res
          .status(400)
          .send({ message: "this appointment already taken" });

      const result = await Appointment.create({
        from,
        to,
        appointment: time,
        doctor,
        date,
        patient,
      });

      res.send(result);
    } catch (err) {
      console.log(err);
    }
  }

  async readAll(req, res) {
    const {date} = req.params;
    const doctor = req.user.userId;
    const appointments = await Appointment.find({date,doctor}).populate("patient");
    res.send(appointments)
  }
}
