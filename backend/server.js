const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "medicalDB"
});

app.get('/', (req, res) => {
    return res.json("From Backend Server");
});



app.post('/login', (req, res) => {
    const {
        email,
        password
    } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).json({
            error: "Database error",
            details: err
        });

        if (result.length === 0) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const user = result[0];

        // Compare entered password with hashed password
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({
                error: "Error comparing passwords"
            });

            if (isMatch) {
                // Password matched
                return res.json({
                    success: true,
                    message: "Login successful",
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                });
            } else {
                //  Password did not match
                return res.status(401).json({
                    success: false,
                    message: "Invalid password"
                });
            }
        });
    });
});

app.post('/register', async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body;

    try {
        // Check if email already exists
        const checkSql = "SELECT * FROM users WHERE email = ?";
        db.query(checkSql, [email], async (err, result) => {
            if (err) return res.status(500).json({
                success: false,
                error: "Database error",
                details: err
            });

            if (result.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: "Email already registered"
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into database
            const insertSql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
            db.query(insertSql, [name, email, hashedPassword, 'user'], (err, result) => {
                if (err) return res.status(500).json({
                    success: false,
                    error: "Insert failed",
                    details: err
                });

                return res.json({
                    success: true,
                    message: "User registered successfully"
                });
            });
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: "Hashing failed"
        });
    }
});


// Get All Patients 
app.get('/patients', (req, res) => {
    const sql = "SELECT * FROM patients";
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({
            error: "Database error",
            details: err
        });
        return res.json(data);
    });
});

// Add Patient 
app.post('/patients', (req, res) => {
    const {
        name,
        age,
        gender,
        diagnosis
    } = req.body;
    const sql = "INSERT INTO patients (name, age, gender, diagnosis) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, age, gender, diagnosis], (err, result) => {
        if (err) return res.status(500).json({
            error: "Insert failed",
            details: err
        });
        return res.json({
            success: true,
            message: "Patient added successfully",
            patientId: result.insertId
        });
    });
});

// Update Patient 
app.put('/patients/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        age,
        gender,
        diagnosis
    } = req.body;
    const sql = "UPDATE patients SET name = ?, age = ?, gender = ?, diagnosis = ? WHERE id = ?";
    db.query(sql, [name, age, gender, diagnosis, id], (err, result) => {
        if (err) return res.status(500).json({
            error: "Update failed",
            details: err
        });
        return res.json({
            success: true,
            message: "Patient updated successfully"
        });
    });
});

// Delete Patient 
app.delete('/patients/:id', (req, res) => {
    const {
        id
    } = req.params;
    const sql = "DELETE FROM patients WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({
            error: "Delete failed",
            details: err
        });
        return res.json({
            success: true,
            message: "Patient deleted successfully"
        });
    });
});
app.get('/dashboard-stats', (req, res) => {
    const stats = {
        totalPatients: 0,
        totalMale: 0,
        totalFemale: 0,
        diagnoses: {},
    };

    const sql = "SELECT gender, diagnosis FROM patients";

    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({
            error: "Database error",
            details: err
        });

        stats.totalPatients = results.length;
        results.forEach((row) => {
            if (row.gender === 'Male') stats.totalMale++;
            if (row.gender === 'Female') stats.totalFemale++;

            const diag = row.diagnosis || 'Unknown';
            stats.diagnoses[diag] = (stats.diagnoses[diag] || 0) + 1;
        });

        res.json(stats);
    });
});




app.listen(8081, () => {
    console.log('Server is running on http://localhost:8081');
});
