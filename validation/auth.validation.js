import Joi from 'joi'

export const settingSchema =Joi.object({
    appointmentTime: Joi.string().required(),
    dayStartTime: Joi.string().required(),
    dayEndTime: Joi.string().required(),
    image: Joi.string(),
    expertise: Joi.string().required()
})
