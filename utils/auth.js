const authMiddleware = (req, res, next) => {
    // Check if the user is logged in
    if (!req.session.logged_in) {
      // If not logged in, redirect to the login page
      return res.redirect('/login');
    }
    
    // If the user is logged in, proceed to the next middleware or route handler
    next();
  };
  


  module.exports = authMiddleware;