
const patientsFields = {
    h1: {
        id: {
            field: "﻿PatientID",
        },
        startDate: {
            field: "StartDate"
        },
        endDate: {
            field: "EndDate",
            emptyValue: "" 
        },
        status: {
            field: "Active",
        },
        diagnoses: {
            field: "Diagnoses",
            emptyValue: "" 
        },
        numberOfCycles: {
            field: "CyclesXDays",
            extract: '[^X]*'
        },
        daysInCycle: {
            field: "CyclesXDays",
            extract: '[^X]*$'
        }
    },
    h2: {
        id: {
            field: "PatientId",
            type: "int"
        },
        startDate: {
            field: "StartDate"
        },
        endDate: {
            field: "EndDate",
            emptyValue: "NULL"
        },
        status: {
            field: "Status",
        },
        diagnoses: {
            field: "AssociatedDiagnoses",
            emptyValue: "NULL" 
        },
        numberOfCycles: {
            field: "NumberOfCycles",
        },
        daysInCycle: {
            field: "",
            default: ""

        }
    }
}

module.exports = patientsFields