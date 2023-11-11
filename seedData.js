import ExpertiseModel from "./model/expertise.model.js";

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
