import { faker } from "@faker-js/faker";
import ExpertiseModel from "./model/expertise.model.js";
import userModel, { ROLES } from "./model/user.model.js";
import bcrypt from "bcrypt";

export function seedExpertise() {
  return ExpertiseModel.create(
    ...[
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
      "Sports medicine",
    ].map((item) => ({ title: item }))
  );
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomItemIn(array) {
  return array[randomNumber(0, array.length)];
}

export async function seedDoctors(count = 20) {
  const expertiseList = (await ExpertiseModel.find().lean()).map(
    (item) => item._id
  );
  const hashPassword = await bcrypt.hash("1234", 10);
  for (let index = 0; index < count; index++) {
    const username = faker.person.firstName();
    const doctor = {
            username: username,
      password: hashPassword,
      fullName: faker.person.fullName({firstName : username}),
      role: ROLES.DOCTOR,
      setting: {
        appointmentTime: randomItemIn([10, 15, 20]),
        dayStartTime: "08:00",
        dayEndTime: "12:00",
        active: true,
        location: {
          lat: randomNumber(52461239, 52558612) / Math.pow(10, 6),
          lng: randomNumber(13298264, 13617039) / Math.pow(10, 6),
        },
        expertise: randomItemIn(expertiseList),
      },
    };
    try {
      await userModel.create(doctor);
    } catch (err) {}
  }
}
