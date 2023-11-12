import { faker } from '@faker-js/faker';
import ExpertiseModel from "./model/expertise.model.js";
import userModel, { ROLES } from './model/user.model.js';

export function seedExpertise() {
    return ExpertiseModel.create(...[
        "Orthopedics",
        "Internal medicine",
        "Rheumatology",
        "Ophthalmology",
        "Neurology",
        "Pathology",
        "Urology",
        "Dermatology",
        "Pediatrics",
        "Gastroenterology",
        "Psychiatry",
        "Emergency medicine",
        "Cardiology",
        "Family medicine",
        "Obstetrics and gynaecology",
        "Neurological Surgery",
        "Oncology",
        "Geriatric medicine",
        "Endocrinology",
        "Anesthesiology",
        "Otolaryngology",
        "Nephrology",
        "Hematology",
        "Sports medicine"
    ].map(item => ({title: item})))
}

function randomItemIn(array){
return array[Math.floor(Math.random()*array.length)]
}

export async function seedDoctors(count=20){
    const expertiseList = (await ExpertiseModel.find().lean()).map(item=>item._id);

    for (let index = 0; index < count; index++) {
        const doctor = {
            username : faker.person.firstName(),
            password : "1234",
            fullName : faker.person.fullName(),
            role : ROLES.DOCTOR,
            setting : {
                appointmentTime : randomItemIn([10,15,20]),
                dayStartTime : "08:00",
                dayEndTime : "12:00",
                active:true,
                expertise : randomItemIn(expertiseList)
            }
        }
        await userModel.create(doctor)
        
    }

}