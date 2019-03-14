const User = require('../models/user.js'),
      jwt = require('jsonwebtoken'),
      secret = process.env.SECRET;

async function createUser(req, res) {
    let user = new User(req.body);
    await user.save();

    // Creates a Json Web Token to keep track of user sessions.
    let token = jwt.sign(
      { _id: user._id,
        username: user.username },
      secret,
      { expiresIn: "60 days" },
    );
  
    // Sets the token to a cookie in user's browser.
    res.sendStatus(200).cookie('nToken', token, { maxAge: 900000, httpOnly: true });
};