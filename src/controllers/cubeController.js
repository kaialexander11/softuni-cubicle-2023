const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');

const cubeManager = require('../managers/cubeManager');
const accessoryManager = require('../managers/accessoryManager');
const { getDifficultyOptionsViewData } = require('../utils/viewHelpers');



// We place details here, so isAuth will not go through it (we don't want to)
router.get('/:cubeId/details', async (req, res) => {
    const cube = await cubeManager.getOneWithAccessories(req.params.cubeId).lean();
    //console.log(cube);

    if (!cube) {
        return res.redirect('/404');
    }

    const isOwner = cube.owner?.toString() === req.user?._id;

    // console.log(cube.owner.toString());
    // console.log(req.user._id);
    // console.log(isOwner);

    res.render('cube/details', { cube, isOwner });
});


// Path /cubes/create
router.get('/create', isAuth, (req, res) => {

    res.render('cube/create');
    //console.log(req.user);
    //const token = req.cookies['auth'];
    //console.log(cubeManager.getAll());

});

router.post('/create', isAuth, async (req, res) => {
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
        owner: req.user._id,
    });


    //res.send('Form submitted!');
    res.redirect('/');
});




router.get('/:cubeId/attach-accessory', isAuth, async (req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const accessories = await accessoryManager.getOthers(cube.accessories).lean();

    const hasAccessories = accessories.length > 0;

    res.render('accessory/attach', { cube, accessories, hasAccessories });
});

router.post('/:cubeId/attach-accessory', isAuth, async (req, res) => {
    const { accessory: accessoryId } = req.body;
    //console.log(accessoryId);
    const cubeId = req.params.cubeId;

    await cubeManager.attachAccessory(cubeId, accessoryId);

    res.redirect(`/cubes/${cubeId}/details`);
});

router.get('/:cubeId/delete', isAuth, async(req, res) => {
    const cube = await cubeManager.getOne(req.params.cubeId).lean();
    const options = getDifficultyOptionsViewData(cube.difficultyLevel);

    res.render('cube/delete', { cube, options });
});

router.post('/:cubeId/delete', isAuth, async (req, res) => {

    await cubeManager.delete(req.params.cubeId);

    res.redirect('/');

});



router.get('/:cubeId/edit', isAuth, async(req, res) => {

    const cube = await cubeManager.getOne(req.params.cubeId).lean();

    //Defence:
    if(cube.owner.toString() !== req.user?._id) {
        return res.redirect('/404');
    }

    const options = getDifficultyOptionsViewData(cube.difficultyLevel);

    res.render('cube/edit', { cube, options });
});



router.post('/:cubeId/edit', isAuth, async(req, res) => {
    //const { name, description, imageUrl, difficultyLevel } = req.body;
    const cubeData = req.body;

    await cubeManager.update(req.params.cubeId, cubeData);

    res.redirect(`/cubes/${req.params.cubeId}/details`);
});

module.exports = router;