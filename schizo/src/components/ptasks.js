import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { toast } from 'react-toastify';
import { getPatientEmail } from './getpatient';
import styled from 'styled-components';

const PatientTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [patientEmail, setPatientEmail] = useState(''); // Patient email state

    useEffect(() => {
        // Fetch patient email first
        const fetchPatientEmail = async () => {
            try {
                const email = await getPatientEmail(); // Fetch patient email
                setPatientEmail(email); // Set patient email state
            } catch (error) {
                toast.error('Error fetching patient email');
                console.error(error);
            }
        };

        fetchPatientEmail();
    }, []); // Run once when the component mounts

    useEffect(() => {
        // Fetch tasks only after patientEmail is set
        if (patientEmail) {
            fetchTasks();
        }
    }, [patientEmail]); // Re-run when patientEmail changes

    const fetchTasks = async () => {
        if (!patientEmail) {
            return; // If patient email is not available, return early
        }

        const { data, error } = await supabase
            .from('tasks')
            .select('*')
            .eq('useremail', patientEmail); // Use patientEmail for the query

        if (error) {
            toast.error('Error fetching tasks');
            console.error(error);
        } else {
            // Automatically set tasks past due if the due date is missed
            const updatedTasks = data.map(task => ({
                ...task,
                status: new Date(task.dueDate) < new Date() && task.status === 'Pending'
                    ? 'Past Due'
                    : task.status
            }));
            setTasks(updatedTasks);
        }
    };

    const updateTaskStatus = async (taskId, newStatus) => {
        const { error } = await supabase
            .from('tasks')
            .update({ status: newStatus })
            .eq('id', taskId);

        if (error) {
            toast.error('Failed to update task status: ' + error.message);
        } else {
            toast.success('Task status updated');
            fetchTasks(); // Refresh tasks after updating
        }
    };

    return (
        <TaskContainer>
            <h2>My Tasks</h2>
            {tasks.map(task => (
                <TaskCard key={task.id} className={task.status.toLowerCase()}>
                    <p><strong>{task.description}</strong></p>
                    <p>Status: {task.status}</p>
                    <p>Due Date: {task.duedate}</p>

                    {task.status === 'Pending' && (
                        <ActionButton onClick={() => updateTaskStatus(task.id, 'In Progress')}>
                            Mark as In Progress
                        </ActionButton>
                    )}
                    {task.status === 'In Progress' && (
                        <ActionButton onClick={() => updateTaskStatus(task.id, 'Submitted')}>
                            Mark as Submitted
                        </ActionButton>
                    )}
                    {task.status === 'Past Due' && <OverdueText>Task is past due.</OverdueText>}
                </TaskCard>
            ))}
        </TaskContainer>
    );
};

const TaskContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const TaskCard = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    }

    p {
        margin: 5px 0;
    }

    &.pending {
        border-left: 5px solid #f0ad4e;
        background-color: #fff8e1;
    }

    &.in-progress {
        border-left: 5px solid #5bc0de;
        background-color: #d9f7fa;
    }

    &.submitted {
        border-left: 5px solid #28a745;
        background-color: #e8f9e7;
    }

    &.past-due {
        border-left: 5px solid #d9534f;
        background-color: #f8d7da;
    }
`;

const ActionButton = styled.button`
    padding: 8px 15px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #45a049;
    }
`;

const OverdueText = styled.p`
    color: #d9534f;
    font-weight: bold;
`;

export default PatientTasks;
