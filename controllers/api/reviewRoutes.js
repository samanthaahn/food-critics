const router = require('express').Router();
const { Review } = require('../../models');
const withAuth = require('../../utils/auth');
console.log("review Routes")

router.post('/', async (req, res) => {
  try {
    const { dish_id, stars, date, comment,} = req.body;
console.log(req.session)
console.log("Hey we are adding reviews here")
    // Create a new review record
    const newReview = await Review.create({
      dish_id,
      stars,
      date,
      comment,
      user_id: req.session.userId
    });

    // Send the new review record as the response
    res.status(201).json(newReview);
  } catch (err) {
    console.error('Error in POST /review:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err });
  }
});

module.exports = router;






