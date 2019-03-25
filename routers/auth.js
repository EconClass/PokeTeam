const router = require('express').Router(),
  authControls = require('../controllers/authControllers.js'),
  errHandler = require('../utils/errorHandler.js'),
  authUser = require("../utils/helpers.js").authorize;

// CREATE USER
router.post('/user', errHandler(authControls.createUser));

// LOGIN
router.post('/login', errHandler(authControls.logIn));

// LOGOUT
router.get('/logout', errHandler(authUser), errHandler(authControls.logOut));

// USES SAME ENDPOINT
router.route('/user/:userId')
  .all(errHandler(authUser))      // CHECK IF USER HAS ACCESS
  .get(errHandler(authControls.seeUser))        // SEE USER INFO
  .put(errHandler(authControls.updateUser))     // UPDATE USER INFO
  .delete(errHandler(authControls.deleteUser)); // DELETE USER ACCOUNT

module.exports = router;
