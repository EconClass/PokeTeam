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

// AUTHORIZE Users
async function authUser(req, res, next) {
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    let token = req.cookies.nToken;
    let decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  next();
}

module.exports = {
  unionArrays,
  arrayIter,
  authorize,
};
