const express = require("express");
const router = express.Router();
const movieControllers = require('../controllers/movieControllers');
// Movies Routes
router.get("/", movieControllers.movies);
router.get("/:id", movieControllers.movieById);
router.post("/Add", movieControllers.addNewMovie);
router.get("/category/:categoryName",movieControllers.movieBycategoryName);
router.delete("/:title", movieControllers.delMovieByTitle);

module.exports = router;
