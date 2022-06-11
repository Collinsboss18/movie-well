const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const { PORT, AUTH_SERVER, MOVIE_SERVER, QUERY_SERVER } = require("./config/app.config");
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.post("/events", async (req, res) => {
	try {
		const events = req.body;
	
		await axios.post(`${AUTH_SERVER}/events`, events);
		await axios.post(`${MOVIE_SERVER}/events`, events);
		await axios.post(`${QUERY_SERVER}/events`, events);
	
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
