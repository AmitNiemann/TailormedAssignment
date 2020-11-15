
const patientsFields = {
    h1: {
        id: {
            field: "﻿PatientID",
        },
        birthDate: {
            field: "PatientDOB"
        },
        isDeceased: {
            field: "IsDeceased",
            trueValue: "Deceased" 
        },
        deathTime: {
            field: "DOD_TS",
            emptyValue: ''
        },
        gender: {
            field: "Gender"
        }
    },
    h2: {
        id: {
            field: "﻿PatientId",
            type: "int"
        },
        birthDate: {
            field: "PatientDOB"
        },
        isDeceased: {
            field: "IsPatientDeceased",
            trueValue: "T" 
        },
        deathTime: {
            field: "DeathDate",
            emptyValue: 'NULL'
        },
        gender: {
            field: "Gender"
        }
    }
}

module.exports = patientsFields