const { validateToken } = require("../middleware/auth");
const { createMovie, getMovies } = require("./movie.controller");
const router = require("express").Router();


router.get("/", getMovies);
router.post("/", [validateToken], createMovie);

module.exports = router;
