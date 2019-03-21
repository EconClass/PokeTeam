const jwt = require("jsonwebtoken");

// Used to find the union of two arrays
function unionArrays(x, y) {
  let result = [...new Set([...x, ...y])];
  return result;
}

/** 
 * Finds the values of the specified property of objects
 * in an array of objects. Returns an array of values.
 */
function arrayIter(inputArray, property) {
  let results = []
  for(i = 0; i < inputArray.length; i++) {
    results.push(inputArray[i][property])
  };

  return results
};

// AUTHORIZE User access.
async function authorize(req, res, next) {
  if (typeof req.cookies.nToken === "" || req.cookies.nToken === null) {
    req.user = null;
    res.status(400).send('Unauthorized Access.');
  } else {
    let token = req.cookies.nToken;
    let decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  };
  next();
};

// GET a User's account info.
async function seeUser(req, res, next) {
  let user = await User.findOne({ _id: req.params.userId });
  res.send(user);
};

// UPDATE a User's account info.
async function updateUser(req, res, next) {
  await User.findOneAndUpdate({ _id: req.params.userId }, req.body);
  res.sendStatus(200);
};

module.exports = {
  unionArrays,
  arrayIter,
  authorize,
};
