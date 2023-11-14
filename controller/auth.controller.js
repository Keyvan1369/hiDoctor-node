import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from "../model/user.model.js";
import {settingSchema} from "../validation/auth.validation.js";

export default class AuthController {
    async login(req, res) {
        // get username password  from body
        const {username, password} = req.body

        // check username,password in db exist
        const user = await UserModel.findOne({username})

        // if does not exist send error
        if (!user) return res.status(400).send({message: "wrong username or password"})

        // else check password
        const isMatched = await bcrypt.compare(password, user.password)

        // if not correct send error
        if (!isMatched) return res.status(400).send({message: "wrong username or password"})

        // else create token and send to user
        const token = jwt.sign({
            userId: user._id, role: user.role
        }, process.env.JWT_SECRET)


        res.send({token, message: "success", user})
    }

    async register(req, res) {
        // get username , password , fullname from body
        const {username, password, fullName,role} = req.body
        if (!username || !password || !fullName || !role) return res.status(400).send({message: "all fields required"})
        // check username exists in db or not
        let user = await UserModel.findOne({username: username,})

        // if exist send error
        if (user) {
            return res.status(400).send({message: "username already exists"})
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        // else create new user
        user = await UserModel.create({...req.body, password: hashedPassword})

        // send success ...
        res.send({message: "register successfully"})
    }

    async updateSetting(req, res) {
        const settings = req.body;
        const {error} = settingSchema.validate(settings)
        if (error)
            return res.status(400).send({message: error.message})

        const doctor = await UserModel.findById(req.user.userId);
        if (!doctor) return res.status(400).send({message: "user not found"})

        doctor.setting = {
            appointmentTime: settings.appointmentTime,
            dayStartTime: settings.dayStartTime,
            dayEndTime: settings.dayEndTime,
            image: settings.image,
            expertise: settings.expertise,
            active: true,
            location: settings.location,
        }

        await doctor.save()

        res.send(doctor)

    }

    async getProfile(req, res) {
        
        const user = await UserModel.findById(req.user.userId);
        if (!user) return res.status(400).send({message: "user not found"})
        return res.send(user)
    }
}
