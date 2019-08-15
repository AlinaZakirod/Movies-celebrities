const express = require("express");
const router = express.Router();

const Movie = require('../models/movies');
const Star = require('../models/celebrity')

// router.get('/movies/new', (req, res, next) => {
//     res.render('movies/new-movie')
// })

router.get('/movies/new', (req, res, next) => {
    Star
        .find()
        .then(allStars => res.render("movies/new-movie", {allStars}))
        .catch(err => console.log("error while displaying new book: ", err))
});

// always in  a post --> redirect , in aget, re.render 
// forn action, res.redirect, a href always starts with /


//to pass fields from the new movie form
router.post('/movies/create', (req, res, next) => {
    console.log("Where?")
 Movie
    .create(req.body)
    .then( newMovie => {
        console.log("success!", newMovie)
        res.redirect('/movies')      
    })
    .catch( err => console.log("Error while creating a movie:", err));
});

// to display all movies
router.get('/movies', (req, res, next) => {
    Movie
        .find()
        .then(moviesFromDb => res.render('movies/movies.hbs', { movies: moviesFromDb  }))
        .catch(err => console.log("Error while getting movies from DB:", err));
});






//to delete the movie
router.post("/movies/:movieId/delete", (req, res, next) =>{
    Movie
        .findByIdAndRemove(req.params.movieId)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log("error while deleting the movie: ", err))
})


// just to render edit page:
// router.get('/movies/:movieId/edit', (req, res, next) => {
//     res.render('movies/edit-movie');
//   });


// to display updating movie form
// router.get('/movies/:movieId/edit', (req, res, next) => {
//        Movie       
//         .findById(req.params.movieId)
//         .then( theMovie => {
//             Star
//                 .find()
//                 .then(allStars => {
//                     allStars.forEach(theStar => {
//                         if(theMovie.cast._id.equals(theStar._id)){
//                             theStar.isActor = true;
//                         }
//                     });
//                     res.render('movies/edit-movie', { theMovie, allStars });
//                 })
//                 .catch( err => console.log("Error while getting all stars: ", err));
//         })
//         .catch(err => console.log("Error while updating the movie:", err))
// })


router.get('/movies/:movieId/edit', (req, res, next) => {
    Movie       
     .findById(req.params.movieId)
     .then( theMovie => {
         Star
             .find()
             .then(allStars => res.render('movies/edit-movie', { theMovie, allStars }))
             .catch( err => console.log("Error while getting all stars: ", err));
     })
     .catch(err => console.log("Error while updating the movie:", err))
})

//to saved updated movie
// router.post("/movies/:movieId/update", (req, res, next) => {
//     Movie
//         .create(req.body)
//         .findByIdAndUpdate(req.params.id, req.body)
//         .then(updatedMovie => res.redirect(`/movies/${updatedMovie._id}`))
//         .catch(err => console.log("error while updating the movie", err));
// });

router.post("/movies/:movieId/update", (req, res, next) => {
    Movie
        .findByIdAndUpdate(req.params.movieId, req.body)
        .then(res.redirect(`/movies/${req.params.movieId}`))
        .catch(err => {
            res.redirect(`/movies/${req.params.movieId}`)
            console.log("error while updating the movie", err)
        })
});

// to see movie detail page
router.get('/movies/:movieId' , (req, res, next) => {
    Movie   
        .findById(req.params.movieId)
        .populate('cast')
        .then(theMovie => {
            res.render("movies/movie-details", {theMovie});
        })
        .catch( err => console.log('error while getting details of the movie:', err))
})



module.exports = router;
