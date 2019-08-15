const express = require("express");
const router = express.Router();

const Movie = require('../models/movies');
const Star = require('../models/celebrity');

router.get('/celebrities/new', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})
// always in  a post --> redirect , always in a get, re.render
// forn action, res.redirect, a href always starts with /
router.post('/celebrities/create', (req, res, next) => {
    console.log("Where?")
 Star
    .create(req.body)
    .then( newStar => {

        console.log("success!", newStar)
        res.redirect('/celebrities')    
    })
    .catch( err => console.log("Error while creating a star:", err));
});


router.get('/celebrities', (req, res, next) => {
    Star
        .find()
        .then(starsFromDb => res.render('celebrities/celebreties.hbs', { stars: starsFromDb }))
        .catch(err => console.log("Error while getting celebrities from DB:", err));
});


module.exports = router;




