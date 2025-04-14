// Server-side code
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index.html');
}

function getPatientData(patientId) {
  const sheetId = '1eJd6i_9aMqvNjNVzaYIprciXD9k1VofhpNgCjeRinmE';
  const patientsSheet = SpreadsheetApp.openById(sheetId).getSheetByName('Patients');
  const medicalRecordsSheet = SpreadsheetApp.openById(sheetId).getSheetByName('MedicalRecords');

  // Fetch patient details
  const patientsData = patientsSheet.getDataRange().getValues();
  const patient = patientsData.find(row => row[0] == patientId);

  if (!patient) {
    return JSON.stringify({ error: 'Patient not found' });
  }

  // Fetch medical records for the patient
  const medicalRecordsData = medicalRecordsSheet.getDataRange().getValues();
  const records = medicalRecordsData.filter(row => row[0] == patientId);

  // Return patient details and medical records
  return JSON.stringify({
    patient: {
      id: patient[0],
      name: patient[1],
      age: patient[2],
      gender: patient[3],
      contact: patient[4],
      address: patient[5]
    },
    medicalRecords: records.map(record => ({
      date: record[1],
      diagnosis: record[2],
      treatment: record[3],
      doctor: record[4]
    }))
  });
}