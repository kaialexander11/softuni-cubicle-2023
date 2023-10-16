const uniqid = require('uniqid');
//const db = require('../db.json');

const cubes = [
    {
        id: '1nbo9fv4lnsnl1f2',
        name: 'Machine Cube',
        description: 'This cube creates Robots.',
        imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/016/833/323/large/michail-m-panopticum.jpg?1553640514',
        difficultyLevel: 4
    },

    {
        id: '11bo9fv4lnsnl222',
        name: 'Multiverse Cube',
        description: 'This cube opens portals between Universes.',
        imageUrl: 'https://cdnb.artstation.com/p/assets/images/images/051/319/823/large/andrej-z-t-september-17.jpg?1657011503',
        difficultyLevel: 4
    },

    {
        id: '11bo5554lnsnl888',
        name: 'Cyber Cube',
        description: 'This cube makes the fastest calculations.',
        imageUrl: 'https://cdna.artstation.com/p/assets/images/images/037/252/544/4k/samuel-speziali-2k.jpg?1619894238',
        difficultyLevel: 4
    },
];

exports.getAll = () => cubes.slice();
exports.getOne = (cubeId) => cubes.find(x => x.id == cubeId); 

exports.create = (cubeData) => {

    const newCube = {
        //id: cubes.length + 1,
        //id: (new Date()).getTime(),
        id: uniqid(),
        ...cubeData,
    };

    cubes.push(newCube);

    return newCube;

}