const EventController = {
	initiate: (req, res) => {
		console.log("AUTH");
		res.send("hello world");
	},
};

module.exports = EventController;
