// import { supabase } from './supabaseClient';

// // Function to fetch the current patient's ID (mocked for this example)
// const getCurrentPatientId = () => {
//     // Simulate getting the patient ID from context or authentication
//     return 'fe883190-b4a1-456c-9c0a-c66045d38686'; // Replace with real implementation
// };

// // Function to fetch appointments for a specific patient
// export const fetchPatientAppointments = async () => {
//     const patientId = getCurrentPatientId(); // Fetch dynamically
//     const { data, error } = await supabase
//         .from('appointments')
//         .select('*')
//         .eq('patient_id', patientId);

//     if (error) {
//         console.error('Error fetching appointments:', error);
//         return [];
//     }
//     return data;
// };

// // Function to request an appointment with a specific doctor
// export const requestAppointment = async (doctorId) => {
//     const patientId = getCurrentPatientId(); // Fetch dynamically
//     const { data, error } = await supabase
//         .from('appointments')
//         .insert([
//             { patient_id: patientId, doctor_id: doctorId, status: 'pending' }
//         ]);

//     if (error) {
//         console.error('Error requesting appointment:', error);
//     }
//     return data;
// };
