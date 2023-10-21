const Cube = require('../models/Cube.js');

//The teacher deleted all this code.
//const uniqid = require('uniqid');
//const db = require('../db.json');

// const cubes = [
//     {
//         id: '1nbo9fv4lnsnl1f2',
//         name: 'Machine Cube',
//         description: 'This cube creates Robots.',
//         imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/016/833/323/large/michail-m-panopticum.jpg?1553640514',
//         difficultyLevel: 4
//     },

//     {
//         id: '11bo9fv4lnsnl222',
//         name: 'Multiverse Cube',
//         description: 'This cube opens portals between Universes.',
//         imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/051/319/823/large/andrej-z-t-september-17.jpg?1657011503',
//         difficultyLevel: 4
//     },

//     {
//         id: '11bo5554lnsnl888',
//         name: 'Cyber Cube',
//         description: 'This cube makes the fastest calculations.',
//         imageUrl: 'https://cdna.artstation.com/p/assets/images/images/037/252/544/4k/samuel-speziali-2k.jpg?1619894238',
//         difficultyLevel: 4
//     },
// ];

exports.getAll = async (search, from, to) => {
    //let result = cubes.slice();
    let result = await Cube.find().lean();


    //TODO: use mongoose to filter in the DB
    if (search) {
        result = result.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }


    if (from) {
        result = result.filter(cube => cube.difficultyLevel >= Number(from));
    }

    if (to) {
        result = result.filter(cube => cube.difficultyLevel <= Number(to));
    }

    return result;
};


//exports.getOne = (cubeId) => cubes.find(x => x.id == cubeId); 
exports.getOne = (cubeId) => Cube.findById(cubeId);
//exports.getOneLean = (cubeId) => this.getOne(cubeId).lean(); => VALID!

exports.create = async (cubeData) => {

    const cube = new Cube(cubeData);

    await cube.save();
    
    return cube;

};