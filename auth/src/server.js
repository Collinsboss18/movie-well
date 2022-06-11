const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

/** APP ROUTES */
const AuthRoutes = require("./auth/auth.routes");
const EventRoutes = require("./events/events.routes");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRoutes);
app.use("/events", EventRoutes);

app.use((error, _, res, __) => {
	console.error(`Error processing request ${error}. See next message for details`);
	console.error(error);
	return res.status(500).json({ error: "internal server error" });
});

app.listen(PORT, () => console.log(`auth svc running at port ${PORT}`));
