const axios = require("axios");
const { EVENT_BUS } = require("./config/app.config");

const MovieCreated = async (body) => {
	const data = { type: "MovieCreated", body };
	await axios.post(`${EVENT_BUS}/events`, data);
	return;
};

module.exports = { MovieCreated };
