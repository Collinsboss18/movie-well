const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const { PORT, AUTH_SERVER, MOVIE_SERVER, QUERY_SERVER } = require("./config/app.config");
const app = express();
const events = [];

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get("/events", (req, res) => {
	res.status(200).send(events);
});

app.post("/events", async (req, res) => {
	try {
		const data = req.body;
		events.push(data);

		await axios.post(`${AUTH_SERVER}/events`, data);
		await axios.post(`${MOVIE_SERVER}/events`, data);
		await axios.post(`${QUERY_SERVER}/events`, data);
		res.send({ status: "OK" });
	} catch (error) {
		console.log(error);
	}
});

app.use((error, _, res, __) => {
	console.error(`Error processing request ${error}. See next message for details`);
	console.error(error);
	return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => console.log(`event bus svc running at port ${PORT}`));
