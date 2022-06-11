const MovieService = require("./movie.service");

const MovieController = {
	getMovies: (req, res) => {
		try {
			const getMovies = new MovieService({}).getMovies();
			if (!getMovies.error) {
				res.status(getMovies.code).json(getMovies);
			} else {
				throw getMovies;
			}
		} catch (error) {
			return res.status(error.code).json(new Error(error));
		}
	},

	createMovie: async (req, res) => {
		try {
			const createMovie = await new MovieService(req.body).createMovie();
			console.log(createMovie, "CREATE MOVIE");

			if (!createMovie.error) {
				res.status(createMovie.code).json(createMovie);
			} else {
				throw createMovie;
			}
		} catch (error) {
			console.log(error);
			return res.status(error.code || 500).json(new Error(error));
		}
	},
};

module.exports = MovieController;
