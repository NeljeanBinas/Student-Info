select version();

CREATE DATABASE mockdatabase;

USE mockdatabase;

CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50),
    lastName VARCHAR(50),
    gender VARCHAR(20),
    section VARCHAR(20),
    email VARCHAR(50)
);

SHOW TABLES;

SELECT * FROM student;

INSERT INTO student(firstName, lastName, gender, section, email)
VALUES ('Jane', 'Test', 'Female', 'BSIT-1A', 'jane@test.com');