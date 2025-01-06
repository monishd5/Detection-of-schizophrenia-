// import { supabase } from '../api/supabaseClient';
// import { useState, useEffect } from 'react';

// function AppointmentRequests({ doctorId }) {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       const { data, error } = await supabase
//         .from('appointments')
//         .select('*')
//         .eq('doctor_id', doctorId)
//         .eq('status', 'requested');
//       if (error) console.error(error);
//       else setAppointments(data);
//       setLoading(false);
//     };
//     fetchAppointments();
//   }, [doctorId]);

//   const confirmAppointment = async (id, date, time) => {
//     const { error } = await supabase
//       .from('appointments')
//       .update({
//         status: 'confirmed',
//         confirmed_date: date,
//         confirmed_time: time
//       })
//       .eq('id', id);
//     if (error) {
//       console.error('Error confirming appointment:', error.message);
//     } else {
//       setAppointments(appointments.filter(app => app.id !== id));
//       alert('Appointment confirmed!');
//     }
//   };

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         appointments.map(app => (
//           <div key={app.id}>
//             <p>Patient ID: {app.patient_id}</p>
//             <input type="date" id="date" />
//             <input type="time" id="time" />
//             <button
//               onClick={() => {
//                 const date = document.getElementById('date').value;
//                 const time = document.getElementById('time').value;
//                 confirmAppointment(app.id, date, time);
//               }}
//             >
//               Confirm Appointment
//             </button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default AppointmentRequests;
