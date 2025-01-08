// middleware/admin.js
module.exports = function (req, res, next) {
    console.log('Admin Middleware Hit');
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next(); // Proceed if the user is an Admin
  };
  