import AppointmentTime from '../model/appointmentTime.model.js'

export default class AppointmentTimeController {
    async getAll(req, res) {
        const {date} = req.params;
        const result = await AppointmentTime.find({date})
        res.send(result)
    }

    async create(req, res) {
        const doctor = req.user.userId;
        const {times, date} = req.body

        await AppointmentTime.deleteMany({doctor, date})

        const reservedTimes = await AppointmentTime.create(...times.map(time => ({
            doctor, date, from: time.from, to: time.to
        })))

        if (Array.isArray(reservedTimes))
            res.send(reservedTimes)
        else if (reservedTimes) res.send([reservedTimes])
        else res.send([])
        // const result = await AppointmentTime.findOne({
        //     date,
        //     $or: [
        //         {
        //             from: {
        //                 $lte: from,
        //             },
        //             to: {
        //                 $gt: from
        //             }
        //         },
        //         {
        //             from: {
        //                 $lt: to,
        //             },
        //             to: {
        //                 $gte: to
        //             }
        //         },
        //     ]
        // })
        // if (result)
        //     return res.status(400).send({message: "appointment has conflict with other appointments"})

        // const time = await AppointmentTime.create({
        //     doctor, date, from, to
        // })
    }

    async delete(req, res) {
        const {id} = req.params;
        const isRemoved = await AppointmentTime.findOneAndDelete(id)
        if (isRemoved)
            return res.status(400).send({message: "time is not found"})

        res.send(isRemoved)
    }
}
