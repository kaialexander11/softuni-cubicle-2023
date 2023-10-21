// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const cubeManager = require('../managers/cubeManager');

//VALID
// exports.getHome = (req, res) => {
//     res.render('index');
// };

// We work with another Router
router.get('/', async (req, res) => {
    //console.log(req.query);
    const { search, from, to } = req.query;

    const cubes = await cubeManager.getAll(search, from, to);

    res.render('index', { cubes, search, from, to });
});

router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/404', (req, res) => {
    res.render('404');
});


module.exports = router;
