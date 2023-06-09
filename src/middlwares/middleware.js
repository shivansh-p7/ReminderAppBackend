const jwt = require("jsonwebtoken");

const Authentication = async (req, res, next) => {
    try {
        let BearerToken = req.headers['authorization'];
       
        if (!BearerToken) {
            return res.status(400).send({ status: false, message: "token is missing" });
        }
        // 'Bearer ynrvhlfkl'
        let token = BearerToken.split(" ")[1];
        jwt.verify(token, "fsoc-reminder-app", (err, decodedToken) => {
            if (err) {
                return res.status(401).send({ status: false, message: err.message })
            }
            if (decodedToken) {
                req.decodedToken = decodedToken.userId
                next();
            }
        });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

module.exports.Authentication = Authentication