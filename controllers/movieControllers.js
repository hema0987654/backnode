let { Movieschr } = require('../model/Movie');

let movies = async (req, res) => {
    try {
        let allMovies = await Movieschr.find(); 
        return res.status(200).json(allMovies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message:"erro" });
    }
};

let movieById = async (req, res) => {
    try {
        let { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ message: "Please provide an ID" });
        }

        let movie = await Movieschr.findById(id);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        return res.status(200).json(movie);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while fetching the movie" });
    }
};


let addNewMovie = async (req, res) => {
    try {
        let { id, image, categoryName, title } = req.body;

        if (!id || !image || !categoryName || !title) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let existingMovie = await Movieschr.findOne({ id });

        if (existingMovie) {
            return res.status(400).json({ message: "A movie with this ID already exists" });
        }

        let newMovie = await Movieschr.create({ id, image, categoryName, title });

        return res.json({ message: "Movie added successfully", movie: newMovie });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while adding the movie" });
    }
};


let movieBycategoryName = async (req, res) => {
    try {
        let { categoryName } = req.params;
        
        if (!categoryName) {
            return res.status(400).json({ message: "Please provide an categoryName" });
        }

        let movie = await Movieschr.findById(categoryName);

        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        return res.status(200).json(movie);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while fetching the movie" });
    }
};

let delMovieByTitle = async (req, res) => {
    try {
        let { title } = req.params;

        if (!title) {
            return res.status(400).json({ message: "Please provide a title" });
        }

        let deletedMovie = await Movieschr.findOneAndDelete({ title });

        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        return res.status(200).json({ message: "Movie deleted successfully", deletedMovie });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "An error occurred while deleting the movie" });
    }
};

module.exports = { movies , movieById , addNewMovie , movieBycategoryName , delMovieByTitle};
