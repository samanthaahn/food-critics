const router = require('express').Router();
const { User, Review, Dish } = require('../models');
const withAuth = require('../utils/auth');


// Render the homepage
router.get('/', async (req, res) => {
  // salad category
  const saladData = await Dish.findAll({
    where: {
      dish_type: "salad"
    }
  })
  const salads = saladData.map(salad => salad.get({ plain: true }))

  // appetizer category
  const appetizerData = await Dish.findAll({
    where: {
      dish_type: "appetizer"
    }
  })
  const appetizers = appetizerData.map(appetizer => appetizer.get({ plain: true }))

  // bowl category
  const bowlData = await Dish.findAll({
    where: {
      dish_type: "bowl"
    }
  })
  const bowls = bowlData.map(bowl => bowl.get({ plain: true }))

  // tacos & fajitas category
  const tacoData = await Dish.findAll({
    where: {
      dish_type: "tacos & fajitas"
    }
  })
  const tacos = tacoData.map(taco => taco.get({ plain: true }))

  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    salads,
    appetizers,
    bowls,
    tacos,
  });
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
      include: [{ model: User }, { model: Review, include: [{ model: User }] }],
    });

    if (!dishData) {
      res.status(404).json({ message: 'No dish found with that id!' });
      return;
    }
    const dish = dishData.get({ plain: true });

    //res.status(200).json(dishData);
    res.render('dishpage', dish);
  } catch (err) {
    res.status(500).json(err);
  }
})


router.get('/review', async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.render('dishreview', reviews)
  //   res.status(200).json(reviews);
  } catch (err) {
    console.error('Error in GET /:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
});

module.exports = router;
