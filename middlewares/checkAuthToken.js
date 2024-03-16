const JWT = require("jsonwebtoken");

const checkAuthToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: 'Token d\'authentification manquant.' });
    }

    if (!token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Format de token invalide.' });
    }

    const authToken = token.slice(7);

    JWT.verify(authToken,process.env.SECRET_KEY, (err, decoded) => {
        if(err) {
            console.log(err);
            res.status(400).json({ message: "Le token est invalide" });
        }
    });

    next();
};

module.exports = checkAuthToken;
