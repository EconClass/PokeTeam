const jwt = require("jsonwebtoken");
const got = require('got');
const { GA_TRACKING_ID } = process.env;
const gaUrl = 'http://www.google-analytics.com/collect';

const trackEvent = (category, action, label, value) => {
  const data = {
    // API Version.
    v: '1',
    // Tracking ID / Property ID.
    tid: GA_TRACKING_ID,
    // Anonymous Client Identifier. Ideally, this should be a UUID that
    // is associated with particular user, device, or browser instance.
    cid: '555',
    // Event hit type.
    t: 'event',
    // Event category.
    ec: category,
    // Event action.
    ea: action,
    // Event label.
    el: label,
    // Event value.
    ev: value,
  };

  return got.post(gaUrl, data);
};

const trackPage = (page, title) => {
  const data = {
    // API Version.
    v: '1',
    // Tracking ID / Property ID.
    tid: GA_TRACKING_ID,
    // Anonymous Client Identifier. Ideally, this should be a UUID that
    // is associated with particular user, device, or browser instance.
    cid: '555',
    // Event hit type.
    t: 'pageview',
    // Document hostname.
    dh: 'poke-team-node.herokuapp.com',
    dp: page,   // Ex: `/home`
    dt: title,  // "homepage"
  };

  return got.post(gaUrl, data);
};

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
  trackEvent,
  trackPage
};
