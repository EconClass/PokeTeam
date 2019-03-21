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

// SEE User account info.
async function seeUser(req, res) {
  let user = await User.findOne({ _id: req.params.userId });
  res.send(user);
}

// UPDATE User account info.
async function updateUser(req, res) {
  await User.findOneAndUpdate({ _id: req.params.userId }, req.body);
  res.status(200).send("Updated User");
}

// LOGIN to existing account.
async function logIn(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  console.log("REQUEST", req)
  console.log("REQUEST BODY", req.body)
  console.log("USERNAME", req.body.username)
  const user = await User.findOne({ username }, "username password");
  console.log("USER", user)
  
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
  res.clearCookie('nToken');
  res.sendStatus(200);
}
// DELETE a User's account.
async function deleteUser(req, res, next) {
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
