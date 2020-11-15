
var patiendFields = require("./patientsHospitalsFields")
var treatmentFields = require("./treatmentHospitalsFields")
var fs = require('fs');
var path = require('path');
var csv = require('csv')

const tableNames = {patients: "Patients", treatments: "Treatments"}

async function main() {
    try {
        var patientsFileName = 'hospital_2_Patient.csv'
        var treatmentsFileName = 'hospital_2_Treatment.csv'
        await importFile(path.join(__dirname, '..', patientsFileName), 'h2', tableNames.patients)
        await importFile(path.join(__dirname, '..', treatmentsFileName), 'h2', tableNames.treatments)

        console.log("upload secceeded")
    } catch(error) {
        console.log(error)
    }
}

main()

function importFile(filePath, hospital, table) {
    return new Promise((resolve, reject) => {
        const outputPath = path.join(__dirname, '..', `${table}.csv`)

        fs.createReadStream(filePath).on('error', reject)
        .pipe(csv.parse({columns: true}))
        .pipe(csv.transform((row) => table === tableNames.patients ? extractPatient(row, hospital) : extractTreatment(row, hospital)))
        .pipe(csv.stringify({header: !fs.existsSync(outputPath)}))
        .pipe(fs.createWriteStream(outputPath, {flags: 'a+',}).on('finish', resolve).on('error', reject))        
    })
}


function extractPatient(row, hospital) {

    const {id, birthDate, deathTime, isDeceased, gender} = patiendFields[hospital]            

    return Object.assign({}, {
        id: row[id.field],
        birthDate: new Date(row[birthDate.field]).toISOString(),
        isDeceased: row[isDeceased.field] === isDeceased.trueValue, 
        deathTime: row[deathTime.field] === deathTime.emptyValue ? null: new Date(row[deathTime.field]).toISOString(),
        gender: row[gender.field]

    });
}

function extractTreatment(row, hospital) {
    const {id, startDate, endDate, status, diagnoses, numberOfCycles, daysInCycle} = treatmentFields[hospital]
    if (!row[id.field]) return null  
 
    return Object.assign({}, {
        id: row[id.field],
        startDate: new Date(row[startDate.field]).toISOString(),
        endDate: row[endDate.field] == endDate.emptyValue ? null: new Date(row[endDate.field]).toISOString(), 
        status: row[status.field],
        diagnoses: row[diagnoses.field] == diagnoses.emptyValue ? null: row[diagnoses.field],
        numberOfCycles: numberOfCycles.hasOwnProperty("extract") ? row[numberOfCycles.field].match(numberOfCycles.extract)[0] : row[numberOfCycles.field],
        daysInCycle: daysInCycle.hasOwnProperty("extract") ? row[daysInCycle.field].match(daysInCycle.extract)[0] : row[daysInCycle.field]

    });
}
