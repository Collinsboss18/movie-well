const axios = require("axios");
const { EVENT_BUS } = require("./config/app.config");

const MovieCreated = (body) => {
	const data = { type: "MovieCreated", body };
	axios.post(`${EVENT_BUS}/events`, data);
};

module.exports = { MovieCreated };
