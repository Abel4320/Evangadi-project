const { register, userById, getAllUsers, getuserByEmail, profile } = require('./users.service')
const pool = require('../../config/database')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
module.exports = {
    createUser: (req, res) => {
        const{firstName, lastName, email, password}=req.body
        if (!firstName || !lastName || !email || !password)
            return res.status(400).json({ msg: 'All Fieds Are Required' })
        if (password.length < 8)
            return res.status(400).json({ msg: "Password must be at least 8 charachters" })
      pool.query(`SELECT * FROM registration WHERE user_email=?`, [email], (err, result) => {
    // Handling potential errors in the query
    if (err) {
        return res.status(err).json({ msg: "database connection err" });
    }
    // Checking if a user with the specified email already exists
    if (result.length > 0) {
        return res.status(400).json({ msg: 'An Account With this email already exists' });
    } else {
        // If the user does not exist, proceed with user registration
        const salt = bcrypt.genSaltSync();
        req.body.password = bcrypt.hashSync(password, salt);

        // Calling the register function to insert the user details into the database
        register(req.body, (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ msg: 'database connection error' });
            }

            // After registration, query the database again to get the user details
            pool.query(`SELECT * FROM registration WHERE user_email=?`, [email], (err, result) => {
                if (err) {
                    return res.status.json({ msg: "database connection err" });
                }

                // Update the user details with the obtained user_id
                req.body.userId = result[0].user_id;
                console.log(req.body);

                // Call the profile function to add a profile for the newly registered user
                profile(req.body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ msg: "database connection error" });
                    }
                    // Return a success response after user registration and profile creation
                    return res.status(200).json({
                        msg: "New User added Succesfully",
                        data: results
                    });
                });
            })
        })
     };
  });
    },
    getUsers: (req, res) => {
        getAllUsers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(200).json({msg:"database connection error"})
            }
            return res.status(200).json({data:results})
        })
    },
    getUserById: (req, res) => {
        userById(req.id, (err, results) => {
            if (err) {
                console.log(err)
                return res.status(500).json({msg:"database connection err"})
            }
            if (!results) {
                return res.status(404).json({msg:"record not found"})
            }
            return res.status(200).json({data:results})
        })
    },
    login: (req, res) => {
        const { email, password } = req.body
        if (!email || !password)
            return res.status(400).json({ msg: 'All fields are required!' })
        getuserByEmail(email, (err, results) => {
            if (err) {
                console.log(err)
                res.status(500).json({ msg: "database connection error" })
            } if (!results) {
                return res.status(404).json({msg:"NO account with this email has been registered"})
            }
            const isMatch = bcrypt.compareSync(password, results.user_password)
            if (!isMatch)
                return res.status(404).json({ msg: "invalid credintials" })
            const token = jwt.sign({ id: results.user_id }, process.env.JWT_SECRET, { expiresIn: "1hr" });
            return res.json({
                token,
                user: {
                    id: results.user_id,
                    display_name:results.user_name
                }
            })
        })
    },  
}