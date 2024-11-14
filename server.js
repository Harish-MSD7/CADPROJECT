const express = require("express");  // Import express module
const sqlite3 = require("sqlite3").verbose();  // Import sqlite3 module
const bodyParser = require("body-parser");  // Import body-parser to handle JSON POST requests

const app = express();  // Initialize express app
const db = new sqlite3.Database("./healthdata.db", (err) => {
    if (err) {
        console.error("Error opening database: " + err.message);
    } else {
        console.log("Connected to the SQLite database.");
        
        // Create the health_data table if it doesn't exist
        db.run(`
            CREATE TABLE IF NOT EXISTS health_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                temperature TEXT NOT NULL,
                bloodPressure TEXT NOT NULL,
                heartRate TEXT NOT NULL
            );
        `, (err) => {
            if (err) {
                console.error("Error creating table: " + err.message);
            } else {
                console.log("Health data table created or already exists.");
            }
        });
    }
});

// Use body-parser to parse incoming JSON data
app.use(bodyParser.json());

// POST route to save health data
app.post("/saveHealthData", (req, res) => {
    const { temperature, bloodPressure, heartRate } = req.body;

    if (!temperature || !bloodPressure || !heartRate) {
        return res.json({ success: false, message: "All fields are required!" });
    }

    const query = `INSERT INTO health_data (temperature, bloodPressure, heartRate) VALUES (?, ?, ?)`;

    db.run(query, [temperature, bloodPressure, heartRate], function(err) {
        if (err) {
            console.error("Error executing query: ", err.message);
            return res.status(500).json({
                success: false,
                message: "Failed to save data",
                error: err.message
            });
        }

        res.json({
            success: true,
            message: "Data saved successfully",
            data: { temperature, bloodPressure, heartRate },
        });
    });
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
