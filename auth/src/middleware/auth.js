const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/app.config");

module.exports = {
	validateToken: (req, res, next) => {
		try {
			const authHeader = req.headers.authorization || req.body.token;
			if (!authHeader || !authHeader.startsWith("Bearer ")) throw new UnauthenticatedError("No token provided");

			const token = authHeader.split(" ")[1];
			JWT.verify(token, JWT_SECRET, (error, decoded) => {
				if (error) return res.status(401).json({ message: "jwt invalid", code: 401 });
				req.decoded = decoded;
				next();
			});
		} catch (err) {
			res.status(500).json(new Error(err));
		}
	},
};
