function requireLogin(req, res, next) {
    if (!req.session || !req.session.userId) {
      req.session.error = 'Please log in to view that page.';
      return res.redirect('/login');
    }
    next();
  }
  
  module.exports = { requireLogin };
  