const jwt = require("jsonwebtoken");

// AUTHORIZE User access.
async function authorize(req, res, next) {
  if (req.cookies.nToken === undefined || req.cookies.nToken === "") {
    req.user = undefined;
    res.status(400).send('Unauthorized Access.');
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  };
  next();
};

module.exports = {
  authorize,
};
