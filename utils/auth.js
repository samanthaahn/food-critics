const authMiddleware = (req, res, next) => {
    // Check if the user is logged in
    if (!req.session.logged_in) {
      // If not logged in, redirect to the login page
      return res.redirect('/login');
    }
    
    // If the user is logged in, proceed to the next middleware or route handler
    next();
  };
  
  module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
  }
  
  module.exports = authMiddleware;