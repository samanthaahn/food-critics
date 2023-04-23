const router = require('express').Router();
const { Review } = require('../models');
const withAuth = require('../utils/auth');


// GET all reviews
router.get('/', async (req, res) => {
    try {
      const reviews = await Review.findAll();
      res.render('dishreview', reviews)
    //   res.status(200).json(reviews);
    } catch (err) {
      console.error('Error in GET /:', err);
      res.status(500).json({ message: 'Internal Server Error', error: err });
    }
  });
  router.post('/', async (req, res) => {
    try {
      const { dish_id, stars, date, comment } = req.body;
  
      // Create a new review record
      const newReview = await Review.create({
        dish_id,
        stars,
        date,
        comment,
      });
  
      // Send the new review record as the response
      res.status(201).json(newReview);
    } catch (err) {
      console.error('Error in POST /:', err);
      res.status(500).json({ message: 'Internal Server Error', error: err });
    }
  });


  // POST a new review (withAuth middleware for authentication)
// router.post('/',  async (req, res) => {
//   try {
//     const newReview = await Review.create({
//       stars: req.body.stars,
//       comment: req.body.comment,
//       user_id: req.session.user_id,
//       dish_id: req.body.dish_id,
//     });

//     res.status(201).json(newReview);
//   } catch (err) {
//     console.error('Error in POST /:', err);
//     res.status(400).json({ message: 'Bad Request', error: err });
//   }
// });

router.post('/api/reviews', async (req, res) => {
    try {
      const reviewData = await Review.create(req.body);
      res.status(200).json(reviewData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;