import ExpertiseModel from "../model/expertise.model.js";
import User, { ROLES } from "../model/user.model.js";

export default class PatientController {
  async search(req, res) {
    const { search ,limit} = req.query;
    const doctors = await User.find({
      role: ROLES.DOCTOR,
      $or: [
        {
          fullName: {
            $regex: new RegExp(search, "i"),
          },
        }, {
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
}
