// getdoctorid.js
import { supabase } from './supabaseClient';

export const getDoctorEmail = async () => {
    try {
        // Retrieve the user session from Supabase
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
            console.error('Error fetching user or user not logged in:', userError);
            throw new Error('User is not authenticated');
        }

        const email = user.email;
        console.log('Fetched doctor email:', email);
        
        return email;
        
    } catch (error) {
        console.error('Error in getDoctorEmail function:', error.message);
        throw new Error('Failed to fetch doctor email');
    }
};
