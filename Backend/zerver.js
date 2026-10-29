require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

//frontend comms remember codez
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.log("MySQL Connection Failed");
    console.log(err);
    return;
  }

  console.log("Connected to MySQL!");
});

// This Command lets the typed Info on the INFO PANEL saved into the DATABASE
// Addd a button connecting to it later on CSS

app.post("/addStudent", (req, res) => {
  const student = req.body;
  const sql = `

        INSERT INTO student
        (
            lastName,
            firstName,
            middleName,
            gender,
            academicLevel,
            section,
            email
        )

        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  const values = [
    student.lastName,
    student.firstName,
    student.middleName,
    student.gender,
    student.academicLevel,
    student.section,
    student.email,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Database Error",
      });
    }
    console.log("Student Added Successfully!");
    console.log(result);

    res.json({
      message: "Student Added Successfully!",
    });
  });
});

// get the sql table data and display on the structurez.html Some error happens when
// opened with another tab col2 i will fix it lator maybe.
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM student";
  db.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Database Error",
      });
    }
    res.json(results);
  });
});

app.delete("/deleteStudent/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM student WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: "Database Error",
      });
    }
    console.log("Student Deleted:", id);
    res.json({
      message: "Student Deleted Successfully",
    });
  });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
