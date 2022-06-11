const EventController = {
	initiate: (req, res) => {
		console.log("AUTH");
		res.send("Auth Event");
	},
};

module.exports = EventController;
