const router = require('express').Router();

const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');

// Path /cubes/create
router.get('/create', (req, res) => {

    console.log(req.user);

    //const token = req.cookies['auth'];

    //console.log(cubeManager.getAll());
    res.render('cube/create');
});

router.post('/create', async (req, res) => {
    //console.log(req.body);
    const { 
        name, 
        description, 
        imageUrl, 
        difficultyLevel,
    } = req.body;

    await cubeManager.create({
        name,
        description,
        imageUrl,
        difficultyLevel: Number(difficultyLevel),
        owner: req.user._id
    });


    //res.send('Form submitted!');
    res.redirect('/');
});


router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeManager.getOneWithAccessories(req.params.cubeId).lean();
    //console.log(cube);

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('cube/details', { cube });
});

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.getOthers(cube.accessories).lean();

    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory', async (req, res) => {
    const { accessory: accessoryId } = req.body;
    console.log(accessoryId);

    const cubeId = req.params.cubeId;

    await cubeManager.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cubes/${cubeId}/details`);
});

router.get('/:cubeId/delete', async(req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();

    res.render('cube/delete', { cube });
});

module.exports = router;