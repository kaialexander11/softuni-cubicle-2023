const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficultyLevel: Number,
});

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;


//Two lines in one line (VALID):
//module.exports = mongoose.model('Cube', cubeSchema);