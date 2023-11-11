import Expertise from '../model/expertise.model.js'

export default class ExpertiseController {
    async getAll(req, res) {
        const result = await Expertise.find()
        res.send(result)
    }


}
