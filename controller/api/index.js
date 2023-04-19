const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dishRoutes = require('./dishRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/user', userRoutes);
router.use('/dishe', dishRoutes);
router.use('/review', reviewRoutes);

module.exports = router;