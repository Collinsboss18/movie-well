module.exports = {
	PORT: process.env.PORT || 3002,
	AUTH_SERVER: process.env.AUTH_SERVER || "http://localhost:3000",
	MOVIE_SERVER: process.env.MOVIE_SERVER || "http://localhost:3001",
	QUERY_SERVER: process.env.QUERY_SERVER || "http://localhost:3003",
};
