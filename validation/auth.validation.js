import Joi from 'joi'

export const settingSchema =Joi.object({
    appointmentTime: Joi.required(),
    dayStartTime: Joi.string().required(),
    dayEndTime: Joi.string().required(),
    image: Joi.string(),
    expertise: Joi.string().required(),
    location: Joi.object({
        lat : Joi.number().required(),
        lng : Joi.number().required()
    }).required()
})
