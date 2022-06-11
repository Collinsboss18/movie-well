const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const { PORT } = require("./config/app.config");
const app = express();
const movies = {};

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get("/movies", async (req, res) => {
	console.log(movies, "MOVIES");
	return res.status(200).send(movies);
});

app.post("/events", async (req, res) => {
	const { type, body } = req.body;

	if (type === "MovieCreated") {
		movies[body.id] = body;
	}
	console.log(movies);
});

app.use((error, _, res, __) => {
	console.error(`Error processing request ${error}. See next message for details`);
	console.error(error);
	return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => console.log(`event bus svc running at port ${PORT}`));
