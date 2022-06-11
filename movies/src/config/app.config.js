module.exports = {
	JWT_SECRET: process.env.JWT_SECRET || "secret",
	OMD_API_KEY: process.env.OMD_API_KEY || "dbec9b79",
	EVENT_BUS: process.env.EVENT_BUS_SERVER || "http://localhost:3002",
	AUTH_SERVER: process.env.AUTH_SERVER || "http://localhost:3000",
	OMD_API: process.env.OMD_API || "https://www.omdbapi.com",
};
