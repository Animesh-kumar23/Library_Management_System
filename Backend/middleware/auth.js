const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    //console.log('Authorization Middleware Hit'); // Add this to check if middleware is being called

    // Extract token from the 'Authorization' header
    let token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Get token after "Bearer "
    //console.log('Received Token:', token);

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Remove the last character (if it's a quote)
    if (token[token.length - 1] === '"') {
        token = token.slice(0, -1); // Remove last character
        //console.log('Token after removing last character:', token);
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded.user.id);
        if (decoded && decoded.user) {
            req.user = decoded.user; // Ensure this is being set
          } else {
            console.log('Decoded token does not have user object');
          } // Attach user data to request
        next(); // Continue to the next middleware/route handler
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};
