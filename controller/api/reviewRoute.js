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
