const router = require('express').Router();
const { User } = require('../models');
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
  
  module.exports = router;
