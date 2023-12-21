// Import the MySQL connection pool from the 'config/database' module
const pool = require('../../config/database');

// Export an object with methods to interact with the user-related database operations
module.exports = {
    
    // Register a new user in the 'registration' table
    register: (data, callback) => {
        pool.query(
            `INSERT INTO registration(user_name,user_email, user_password) VALUES(?,?, ?)`, [
                data.firstName,
                data.email,
                data.password
            ],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },

    // Create a user profile in the 'profile' table
    profile: (data, callback) => {
        pool.query(
            `INSERT INTO profile(user_id, first_name, last_name) VALUES(?, ?, ?)`, [
                data.userId,
                data.firstName,
                data.lastName
            ],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },
    // Get user details by user ID from the 'registration' and 'profile' tables
    userById: (id, callback) => {
        pool.query(
            `SELECT registration.user_id, user_name, user_email, first_name, last_name FROM registration LEFT JOIN profile ON registration.user_id = profile.user_id WHERE registration.user_id = ?`, [id],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result[0]);
            }
        );
    },

    // Get user details by user email from the 'registration' table
    getuserByEmail: (email, callback) => {
        pool.query(
            `SELECT * FROM registration WHERE user_email = ?`, [email],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result[0]);
            }
        );
    },
    // Get details of all users from the 'registration' table
    getAllUsers: (callback) => {
        pool.query(
            `SELECT user_id, user_name, user_email FROM registration`, [],
            (err, result) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },
};
