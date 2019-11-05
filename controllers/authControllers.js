const User = require('../models/user.js'),
  jwt = require('jsonwebtoken'),
  secret = process.env.SECRET,
  { trackEvent } = require('../utils/helpers.js');

// CREATE a User account.
async function createUser(req, res) {
  console.log(req.body)
  const user = new User(req.body);
  // const exists = await User.findOne({ email: user.email });
  // if (exists == PromiseRejectionEvent()) {
  //   res.status(401).send('That account already exists!');
  // }
  await user.save();
  const now = new Date();

  // Creates a Json Web Token to keep track of user sessions.
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username
    },
    secret,
    { expiresIn: "60 days" },
  );

  // Google Analytics Event tracker
  trackEvent('New', 'new user', 'new account creation', now.valueOf());

  // Sets the token to a cookie in user's browser.
  res.cookie('nToken', token, { maxAge: 900000, httpOnly: true }).sendStatus(200);
};

// SEE User account info.
async function seeUser(req, res) {
  const user = await User.findOne({ _id: req.params.userId });
  res.send(user);
}

// UPDATE User account info.
async function updateUser(req, res) {
  await User.findOneAndUpdate({ _id: req.params.userId }, req.body);
  res.status(200).send("Updated User");
}

// LOGIN to existing account.
async function logIn(req, res) {
  const { username, password } = req.body;

  const user = await User.findOne({ username }, "username password");

  if (!user) {
    return res.status(401).send({ message: "Wrong Username" });
  }

  // Check the password
  user.comparePassword(password, (err, isMatch) => {
    if (!isMatch) {
      return res.status(401).send({ message: "Wrong password" });
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

// LOGOUT
async function logOut(req, res) {
  res.clearCookie('nToken').sendStatus(200);
}

// DELETE a User's account.
async function deleteUser(req, res) {
  await User.findOneAndDelete({ _id: req.params.userId });
  res.sendStatus(200);
};

module.exports = {
  createUser,
  logIn,
  logOut,
  seeUser,
  updateUser,
  deleteUser,
}
