const jwt = require("jsonwebtoken");

// Used to find the union of two arrays
function unionArrays(x, y) {
  const result = [...new Set([...x, ...y])];
  return result;
}

/** 
 * Finds the values of the specified property of objects
 * in an array of objects. Returns an array of values.
 */
function arrayIter(inputArray, property) {
  const results = []
  for (i = 0; i < inputArray.length; i++) {
    results.push(inputArray[i][property])
  };

  return results
};

// AUTHORIZE User access.
async function authorize(req, res, next) {
  console.log("COOKIE:\n", req.cookies.nToken)
  if (req.cookies.nToken === undefined || req.cookies.nToken === "") {
    req.user = undefined;
    res.status(400).send('Unauthorized Access.');
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
    console.log("User:\n", req.user)
  };
  next();
};

module.exports = {
  unionArrays,
  arrayIter,
  authorize,
};
