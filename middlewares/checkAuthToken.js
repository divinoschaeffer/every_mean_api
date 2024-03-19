const JWT = require("jsonwebtoken");

const checkAuthToken = (req, res, next) => {

    const authToken = req.cookies.token;
    console.log(authToken);

    if (!authToken) {
        return res.status(401).json({ message: 'Token d\'authentification manquant.' });
    }

    JWT.verify(authToken,process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
            console.log(err);
            res.status(400).json({ message: "Le token est invalide" });
        }
    });

    next();
};

module.exports = checkAuthToken;
