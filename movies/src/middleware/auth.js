const JWT = require("jsonwebtoken");
const { JWT_SECRET, AUTH_SERVER } = require("../config/app.config");
const axios = require("axios");

module.exports = {
	validateToken: async (req, res, next) => {
		try {
			const authHeader = req.headers.authorization;
			const result = await axios.post(`${AUTH_SERVER}/auth/verify-token`, { token: authHeader });
			if (result.data?.status) {
				req.decoded = result.data?.user;
				next();
			} else {
				return res.status(401).json(error);
			}
		} catch (error) {
			res.status(error?.response?.code || 500).json(error.response?.data || { message: error.message, code: "500" });
		}
	},
};
