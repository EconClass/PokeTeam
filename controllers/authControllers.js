const User = require('../models/user.js'),
      jwt = require('jsonwebtoken'),
      secret = process.env.SECRET;

// CREATE a User account.
async function createUser(req, res) {
  let user = new User(req.body);
  
  // Creates a Json Web Token to keep track of user sessions.
  let token = jwt.sign({
      _id: user._id,
      username: user.username },
    secret,
    { expiresIn: "60 days" },
  );
  
  await user.save();
    
  console.log(token)
  // Sets the token to a cookie in user's browser.
  res.cookie('nToken', token, { maxAge: 900000, httpOnly: true }).sendStatus(200);
};

// GET a User's account info.
async function seeUser(req, res) {
  let user = await User.findOne({ _id: req.params.userId });
  res.send(user);
};

// UPDATE a User's account info.
async function updateUser(req, res) {
  let user = await User.findOneAndUpdate({ _id: req.params.userId }, req.body);
  res.send(user);
};

// DELETE a User's account.
async function deleteUser(req, res) {
  await User.findOneAndDelete({ _id: req.params.userId });
  res.send('User deleted.');
};
module.exports = {
  createUser,
  seeUser,
  updateUser,
  deleteUser,
}