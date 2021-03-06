const router = require("express").Router();
const { authFactory, AuthError } = require("../auth/auth");
const { JWT_SECRET } = require("../config/app.config");
const { validateToken } = require("../middleware/auth");
const auth = authFactory(JWT_SECRET);

router.post("/", (req, res, next) => {
	if (!req.body) return res.status(400).json({ error: "invalid payload" });
	const { username, password } = req.body;
	if (!username || !password) return res.status(400).json({ error: "invalid payload" });

	try {
		const token = auth(username, password);
		return res.status(200).json({ token });
	} catch (error) {
		if (error instanceof AuthError) return res.status(401).json({ error: error.message });
		next(error);
	}
});

router.post("/verify-token", [validateToken], (req, res) => {
	res.status(200).json({ user: req.decoded, status: true });
});

module.exports = router;
