const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dishRoutes = require('./dishRoutes');
const reviewRoutes = require('./reviewRoutes');
router.use('/review', reviewRoutes);
router.use('/user', userRoutes);
router.use('/dish', dishRoutes);


module.exports = router;