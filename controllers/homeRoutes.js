const router = require('express').Router();
const { User, Review, Dish } = require('../models');
const withAuth = require('../utils/auth');


// Render the homepage
router.get('/', async (req, res) => {
    res.render('homepage');
  });
  
  // Render the login page
  router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });
  
router.get('/dish/:id', async (req, res) => {
  try {
    const dishData = await Dish.findByPk(req.params.id, {
      include: [{ model: User }, { model: Review, include: [{ model: User }]}],
    });

    if (!dishData) {
      res.status(404).json({ message: 'No dish found with that id!' });
      return;
    }
const dish = dishData.get({ plain: true });

    //res.status(200).json(dishData);
    res.render('dishpage',  dish );
  } catch (err) {
    res.status(500).json(err);
  }
})

  module.exports = router;
