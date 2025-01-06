// routes.js
router.post('/signup', async (req, res) => {
    const { email, password, userType } = req.body; // Include userType
    try {
        const newUser = await signUpUser(email, password, userType);
        res.status(201).json({ message: 'Sign up successful!', newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
