// User.js
async function signUpUser(email, password, userType) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: { userType } // Store user type (doctor or patient)
        }
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
