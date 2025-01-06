import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { toast } from 'react-toastify';
import { getDoctorEmail } from './getdoctorid';

const DoctorAssignTasks = () => {
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('Pending');
    const [doctorEmail, setDoctorEmail] = useState('');
    const [patientList, setPatientList] = useState([]); // Store connected patients
    const [selectedPatient, setSelectedPatient] = useState(''); // Selected patient from dropdown
    const [tasks, setTasks] = useState([]); // State for fetched tasks

    useEffect(() => {
        const fetchDoctorEmailAndPatients = async () => {
            try {
                const email = await getDoctorEmail();
                setDoctorEmail(email);

                // Fetch connected patients
                const { data, error } = await supabase
                    .from('connections')
                    .select('patient_email')
                    .eq('doctor_email', email)
                    .eq('status', 'connected');

                if (error) throw error;
                if (data) setPatientList(data.map((entry) => entry.patient_email));
            } catch (error) {
                toast.error('Error fetching doctor email or patients');
                console.error(error);
            }
        };

        fetchDoctorEmailAndPatients();
    }, []);

    const addTask = async (event) => {
        event.preventDefault();
        const [day, month, year] = dueDate.split('-');
        const formattedDueDate = `${year}-${month}-${day}`;

        const task = {
            useremail: selectedPatient,
            doctoremail: doctorEmail,
            description: description.trim(),
            status: status,
            duedate: formattedDueDate,
        };

        const { data, error } = await supabase.from('tasks').insert([task]);

        if (error) {
            console.error('Supabase error:', error);
            toast.error('Failed to assign task: ' + error.message);
        } else {
            toast.success('Task assigned successfully');
            alert('task inserted');
            setDescription('');
            setDueDate('');
            setSelectedPatient('');
        }
    };

    const fetchTasks = async () => {
        if (!selectedPatient) {
            toast.error("Please select a patient to view tasks");
            return;
        }

        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('useremail', selectedPatient);

        if (error) {
            console.error('Supabase error:', error);
            toast.error('Failed to fetch tasks: ' + error.message);
        } else {
            setTasks(data);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Completed':
                return { color: 'green' };
            case 'Pending':
                return { color: 'orange' };
            case 'Past Due':
                return { color: 'red' };
            default:
                return { color: 'black' };
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Assign Task to Patient</h2>
            <form onSubmit={addTask}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Task Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
                    />
                </div>
                
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Patient:</label>
                    <select
                        value={selectedPatient}
                        onChange={(e) => setSelectedPatient(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
                    >
                        <option value="">Select Patient</option>
                        {patientList.map((email) => (
                            <option key={email} value={email}>{email}</option>
                        ))}
                    </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
                    />
                </div>
                
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    Assign Task
                </button>
            </form>

            <h3 style={{ textAlign: 'center', color: '#333', marginTop: '30px' }}>View Patient Tasks</h3>
            <button
                onClick={fetchTasks}
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    marginTop: '10px',
                }}
            >
                View Tasks
            </button>

            {tasks.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <h4 style={{ color: '#333' }}>Tasks for {selectedPatient}</h4>
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        {tasks.map((task) => (
                            <li key={task.id} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                <strong>Description:</strong> {task.description}
                                <br />
                                <strong>Due Date:</strong> {task.duedate}
                                <br />
                                <strong>Status:</strong> <span style={getStatusStyle(task.status)}>{task.status}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DoctorAssignTasks;
