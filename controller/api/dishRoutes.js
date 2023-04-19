const router = require('express').Router();
const { Dish, User, Review } = require('../../models');


// GET all dishes
router.get('/', async (req, res) => {
  try {
    const dishData = await Dish.findAll({
      include: [{ model: User }, { model: Review }],
    });
    res.status(200).json(dishData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single dish by id
router.get('/:id', async (req, res) => {
  try {
    const dishData = await Dish.findByPk(req.params.id, {
      include: [{ model: User }, { model: Review }],
    });

    if (!dishData) {
      res.status(404).json({ message: 'No dish found with that id!' });
      return;
    }

    res.status(200).json(dishData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;