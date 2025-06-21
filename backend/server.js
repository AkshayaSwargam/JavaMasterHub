const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes (crucial for frontend-backend communication)
app.use(express.json()); // Enable parsing of JSON request bodies

// Database connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // <--- IMPORTANT: Enter your actual MySQL root password here if you have one. Leave empty '' if no password.
    database: 'javaskillhub', // Connects to the 'javaskillhub' database
});

// Attempt to connect to MySQL database
db.connect(err => {
    if (err) {
        console.error('MySQL connection failed: ' + err.message);
    } else {
        console.log('Connected to MySQL Database: javaskillhub');
    }
});

// --- User Authentication Endpoints ---

// POST /register: Register a new user
app.post('/register', (req, res) => {
    const { email, password } = req.body;
    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    // IMPORTANT SECURITY NOTE:
    // In a real application, you MUST hash the password here before storing it!
    // Example using bcrypt (you would need to `npm install bcrypt`):
    // const bcrypt = require('bcrypt');
    // const saltRounds = 10;
    // const hashedPassword = bcrypt.hashSync(password, saltRounds);
    // Then use hashedPassword in the SQL query instead of plain password.
    // For this example, we store plain for simplicity based on previous interactions,
    // but this is a severe security risk in production!

    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error('Error registering user:', err.message);
            if (err.code === 'ER_DUP_ENTRY') { // MySQL error for unique constraint violation
                return res.status(409).json({ message: 'User with this email already exists.' });
            }
            return res.status(500).json({ message: 'Failed to register user.', error: err.message });
        }
        // Registration successful. Return success message and new user's ID/email.
        res.status(201).json({ message: 'User registered successfully!', userId: result.insertId, email: email });
    });
});

// POST /login: Authenticate an existing user
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const sql = 'SELECT id, email, password FROM users WHERE email = ?';
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error('Error logging in user:', err.message);
            return res.status(500).json({ message: 'Login failed.', error: err.message });
        }
        if (results.length === 0) {
            // User not found
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const user = results[0];
        // IMPORTANT SECURITY NOTE:
        // In a real application, you MUST compare the provided password with the HASHED password.
        // Example using bcrypt:
        // const passwordMatch = bcrypt.compareSync(password, user.password);
        // if (!passwordMatch) { /* return invalid credentials */ }
        // For this example, we're doing a simple string comparison (NOT secure for production!)
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Login successful. Return user's ID and email (do NOT return password).
        res.status(200).json({ message: 'Login successful!', userId: user.id, email: user.email });
    });
});

// --- Student Profile Management Endpoints ---

// GET /api/profiles: Retrieve all student profiles
app.get('/api/profiles', (req, res) => {
    // You could add filtering here based on query parameters (e.g., /api/profiles?skill=Java)
    const sql = "SELECT id, userId, name, email, skills, description, grades, resumeLink, lastUpdated FROM student_profiles";
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching student profiles:', err.message);
            return res.status(500).json({ message: 'Failed to retrieve profiles', error: err.message });
        }
        // Map over results to parse the 'skills' JSON string back into a JavaScript array
        const profiles = results.map(row => ({
            ...row,
            skills: row.skills ? JSON.parse(row.skills) : []
        }));
        res.status(200).json(profiles);
    });
});

// GET /api/profiles/:userId: Retrieve a single student profile by userId
app.get('/api/profiles/:userId', (req, res) => {
    const { userId } = req.params;
    const sql = "SELECT id, userId, name, email, skills, description, grades, resumeLink, lastUpdated FROM student_profiles WHERE userId = ?";
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error(`Error fetching profile for userId ${userId}:`, err.message);
            return res.status(500).json({ message: 'Failed to retrieve profile', error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Profile not found for this user.' });
        }
        const profile = {
            ...results[0],
            skills: results[0].skills ? JSON.parse(results[0].skills) : []
        };
        res.status(200).json(profile);
    });
});


// POST /api/profiles: Submit a new student profile
app.post('/api/profiles', (req, res) => {
    // Extract data from the request body
    const { userId, name, email, skills, description, grades, resumeLink, lastUpdated } = req.body;

    // Convert skills array to JSON string for database storage
    const skillsJson = JSON.stringify(skills || []);
    // Set lastUpdated timestamp
    const lastUpdatedDate = lastUpdated ? new Date(lastUpdated) : new Date();

    // First, check if a profile already exists for this userId
    const checkSql = 'SELECT id FROM student_profiles WHERE userId = ?';
    db.query(checkSql, [userId], (err, results) => {
        if (err) {
            console.error('Error checking for existing profile:', err.message);
            return res.status(500).json({ message: 'Server error during profile check.' });
        }
        if (results.length > 0) {
            // A profile already exists for this userId, so instruct the client to use PUT for update
            return res.status(409).json({ message: 'A profile already exists for this user. Please update it using PUT.', profileId: results[0].id });
        }

        // If no existing profile, proceed with INSERT
        const insertSql = `INSERT INTO student_profiles (userId, name, email, skills, description, grades, resumeLink, lastUpdated)
                           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [userId, name, email, skillsJson, description, grades, resumeLink, lastUpdatedDate];

        db.query(insertSql, values, (err, results) => {
            if (err) {
                console.error('Error inserting student profile:', err.message);
                return res.status(500).json({ message: 'Failed to insert data', error: err.message });
            }
            res.status(201).json({ message: 'Profile inserted successfully!', id: results.insertId });
        });
    });
});

// PUT /api/profiles/:userId: Update an existing student profile
app.put('/api/profiles/:userId', (req, res) => {
    const { userId } = req.params; // Get userId from URL parameters
    const { name, email, skills, description, grades, resumeLink } = req.body; // Data to update

    // Convert skills array to JSON string for database storage
    const skillsJson = JSON.stringify(skills || []);
    // Update lastUpdated timestamp to current time
    const lastUpdatedDate = new Date();

    // SQL query to update the profile based on userId
    const sql = `UPDATE student_profiles
                 SET name = ?, email = ?, skills = ?, description = ?, grades = ?, resumeLink = ?, lastUpdated = ?
                 WHERE userId = ?`;
    const values = [name, email, skillsJson, description, grades, resumeLink, lastUpdatedDate, userId];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error(`Error updating student profile for userId ${userId}:`, err.message);
            return res.status(500).json({ message: 'Failed to update profile', error: err.message });
        }

        if (results.affectedRows === 0) {
            // No row was updated, likely because the userId was not found
            return res.status(404).json({ message: 'Profile not found for this user, or no changes were made.' });
        }

        res.status(200).json({ message: 'Profile updated successfully!', userId: userId });
    });
});


// Define the port on which the backend server will listen
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
    console.log('Ensure your MySQL database "javaskillhub" is running and has "users" and "student_profiles" tables.');
});