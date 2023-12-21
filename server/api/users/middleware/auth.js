const jwt = require("jsonwebtoken");
require('dotenv').config();
const auth = (req, res, next) => {
    try {
        const token = req.header("x-auth-token")
        if (!token)
            return res.status(401).json({ msg: "No authentication" });
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res.status(401).json({ msg: "Token Verification Failed" });
        req.id = verified.id
        next()
    } catch (err) {
        res.status(500).json({ error: err.messege })
    };
};
module.exports=auth