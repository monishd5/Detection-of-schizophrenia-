// import { supabase } from './supabaseClient';

// // Fetch appointments for the doctor
// export const fetchDoctorAppointments = async (doctorId) => {
//     const { data, error } = await supabase
//         .from('appointments')
//         .select('*')
//         .eq('doctor_id', doctorId); // Adjust field name if necessary

//     if (error) {
//         console.error('Error fetching appointments:', error);
//         return [];
//     }
//     return data;
// };

// // Respond to an appointment request
// export const respondToAppointment = async (appointmentId, date, time) => {
//     const { data, error } = await supabase
//         .from('appointments')
//         .update({ 
//             status: 'confirmed', // Update the status to confirmed
//             response_date: date, 
//             response_time: time 
//         })
//         .eq('id', appointmentId); // Adjust field name if necessary

//     if (error) {
//         console.error('Error responding to appointment:', error);
//         return null; // Return null on error for better error handling
//     }
//     return data;
// };
