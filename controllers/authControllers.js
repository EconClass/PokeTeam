const User = require('../models/user.js'),
      jwt = require('jsonwebtoken'),
      secret = process.env.SECRET;

// CREATE a User account.
async function createUser(req, res) {
  let user = new User(req.body);
  await user.save();

  // Creates a Json Web Token to keep track of user sessions.
  let token = jwt.sign({
      _id: user._id,
      username: user.username 
    },
    secret,
    { expiresIn: "60 days" },
  );
  
  // Sets the token to a cookie in user's browser.
  res.cookie('nToken', token, { maxAge: 900000, httpOnly: true }).sendStatus(200);
};

// LOGIN to existing account.
async function logIn(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const user = await User.findOne({ username }, "username password");
  
  if (!user) {
    return res.status(401).send({ message: "Wrong Username or Password" });
  }

  // Check the password
  user.comparePassword(password, (err, isMatch) => {
    if (!isMatch) {
      return res.status(401).send({ message: "Wrong Username or password" });
    };
  });
  
  // Create token
  const token = jwt.sign({ 
      _id: user._id,
      username: user.username
    },
    process.env.SECRET,
    { expiresIn: "60 days" }
  );

  // Set token to a cookie and send status 200.
  res.cookie("nToken", token, { maxAge: 900000, httpOnly: true }).sendStatus(200);
};

// DELETE a User's account.
async function deleteUser(req, res, next) {
  await User.findOneAndDelete({ _id: req.params.userId });
  res.sendStatus(200);
};

module.exports = {
  createUser,
  logIn,
  authorize,
  seeUser,
  updateUser,
  deleteUser,
}
