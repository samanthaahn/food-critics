const router = require('express').Router();
const { Review, User, Dish } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all reviews for a dish
router.get('/dish/:dish_id', async (req, res) => {
  try {
    const reviewData = await Review.findAll({
      where: { dish_id: req.params.dish_id },
      include: [{ model: User }, { model: Dish }],
    });
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new review (withAuth middleware for authentication)
router.post('/', withAuth, async (req, res) => {
    try {
      const newReview = await Review.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newReview);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  
  