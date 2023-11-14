import Joi from "joi";

export const appointmentSchema = Joi.object({
  time: Joi.string().required(),
  from: Joi.number().required(),
  to: Joi.number().required(),
  doctor: Joi.string().required(),
  date: Joi.number().required(),
});
