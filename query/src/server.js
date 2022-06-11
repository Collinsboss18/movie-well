const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const { PORT, EVENT_BUS } = require("./config/app.config");
const app = express();
const movies = {};
const handleEvents = (type, data) => {
	if (type === "MovieCreated") {
		movies[data.id] = data;
	}
};

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get("/movies", async (req, res) => {
	return res.status(200).send(movies);
});

app.post("/events", async (req, res) => {
	const { type, body } = req.body;
	handleEvents(type, body);
});

app.use((error, _, res, __) => {
	console.error(`Error processing request ${error}. See next message for details`);
	console.error(error);
	return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, async () => {
	console.log(`query svc running at port ${PORT}`)
	const res = await axios.get(`${EVENT_BUS}/events`);
	for (let event of res.data) {
		console.log("Processing events: ", event.type);
		handleEvents(event.type, event.body)
	}
});
