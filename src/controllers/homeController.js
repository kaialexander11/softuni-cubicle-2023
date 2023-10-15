// const express = require('express');
// const router = express.Router();
const router = require('express').Router();

//VALID
// exports.getHome = (req, res) => {
//     res.render('index');
// };

// We work with another Router
router.get('/', (req, res) => {
    res.render('index');
});

router.get('/about', (req, res) => {
    res.render('about');
})

module.exports = router;
