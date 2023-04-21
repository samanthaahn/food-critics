const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dishRoutes = require('./dishRoutes');


router.use('/user', userRoutes);
router.use('/dish', dishRoutes);

module.exports = router;