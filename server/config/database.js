// Importing the 'mysql2' library
const mysql = require('mysql2');
// Creating a MySQL connection pool with environment variables for configuration
var pool = mysql.createPool({
  host: process.env.DB_HOST,          // Database host
  user: process.env.DB_USER,          // Database user
  password: process.env.DB_PASS,      // Database password
  database: process.env.MYSQL_DB,     // Database name
  connectionLimit: 10,                // Limiting the number of connections in the pool
  insecureAuth: true,                 // Using insecure authentication (temporary solution)
});

// Attempting to get a connection from the pool to check if the database connection is successful
pool.getConnection(function (err, connection) {
  console.log("Database Connected");
});

// SQL queries to create tables in the database
var registration = `
  CREATE TABLE if not exists registration (
    user_id int auto_increment,
    user_name VARCHAR(255) not null,
    user_email VARCHAR(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY(user_id)
  )`;

var profile = `
  CREATE TABLE if not exists profile (
    user_profile_id int auto_increment,
    user_id int not null,
    first_name VARCHAR(255) not null,
    last_name varchar(255) not null,
    PRIMARY KEY(user_profile_id),
    FOREIGN KEY(user_id) REFERENCES registration(user_id)
  )`;

let question = `
CREATE TABLE if not exists question (
  question_id int auto_increment,
  question varchar(255) not null,
  question_description varchar(255) not null,
  question_code_block varchar(255) not null,
  tags varchar(255) not null,
  user_id int not null,
  PRIMARY KEY(question_id),
  FOREIGN KEY(user_id) REFERENCES registration(user_id)
);`;

let answer = `
  CREATE TABLE if not exists answer (
    answer_id int auto_increment,
    answer varchar(255) not null,
    answer_code_block varchar(255) not null,
    user_id int not null,
    question_id int not null,
    FOREIGN KEY(user_id) REFERENCES registration(user_id),
    FOREIGN KEY(question_id) REFERENCES question(question_id)
  )`;

// Executing the SQL queries to create tables
pool.query(registration, function (error, results) {
  if (error) throw error;
  console.log('registration table created');
});

pool.query(profile, function (error, results) {
  if (error) throw error;
  console.log('profile table created');
});

pool.query(question, function (error, results) {
  if (error) throw error;
  console.log('question table created');
});

pool.query(answer, function (error, results) {
  if (error) throw error;
  console.log('answer table created');
});

// Exporting the MySQL connection pool for use in other parts of the application
module.exports = pool;
