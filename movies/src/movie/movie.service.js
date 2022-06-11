const axios = require("axios");
const { v4: uuid } = require("uuid");
const { OMD_API_KEY, OMD_API } = require("../config/app.config");
const { MovieCreated } = require("../event");
const { movies } = require("../models");

class MovieService {
	constructor(data) {
		this.data = data;
	}

	getMovies() {
		return { code: 200, data: movies };
	}

	/**
	 * @requires this.data.title
	 * @requires this.data.director
	 * @returns Movie {}
	 */
	async createMovie() {
		try {
			const response = await axios.post(`${OMD_API}/?s=${this.data.title}&apikey=${OMD_API_KEY}`);
			const data = await response.data;
			const movie = data.Search[0];
			movies.push({ id: uuid(), title: movie.Title, released: movie.Year, genre: movie.Type, director: this.data?.director });
			const result = movies[movies.length - 1];
			MovieCreated(result);
			return { code: 200, data: result };
		} catch (error) {
			return { error: error, message: error.message, code: error.code || 500 };
		}
	}
}

module.exports = MovieService;
