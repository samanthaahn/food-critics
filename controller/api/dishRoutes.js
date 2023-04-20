const router = require('express').Router();
const { Dish, User, Review } = require('../../models');
const withAuth = require('../../utils/auth');

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

// POST a new dish (withAuth middleware for authentication)
router.post('/', withAuth, async (req, res) => {
    try {
      const newDish = await Dish.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newDish);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // PUT to update a dish by id (withAuth middleware for authentication)
  router.put('/:id', withAuth, async (req, res) => {
    try {
      const dishData = await Dish.update(req.body, {
        where: {
          id: req.params.id,
        },
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
  
  // DELETE a dish by id (withAuth middleware for authentication)
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const dishData = await Dish.destroy({
        where: {
          id: req.params.id,
        },
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