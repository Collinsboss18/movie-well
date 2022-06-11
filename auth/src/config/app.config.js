module.exports = {
	JWT_SECRET: process.env.JWT_SECRET || "secret",
	EVENT_BUS: process.env.EVENT_BUS_SERVER || "http://localhost:3002",
};
