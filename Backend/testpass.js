const bcrypt = require('bcryptjs');

const password = 'password1234';

// Hash the password
bcrypt.genSalt(10, (err, salt) => {
  if (err) throw err;
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) throw err;
    console.log("Generated Hash:", hash);

    // Compare the password with the generated hash
    bcrypt.compare(password, hash, (err, isMatch) => {
      if (err) throw err;
      console.log("Password Match:", isMatch); // True or False
    });
  });
});