const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/usernpm i')

router.get('/signup', (req, res, next) =>{
    res.render("user-views/signup")
})



router.post('/signup')



module.exports = router;