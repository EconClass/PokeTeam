const router = require('express').Router(),
      authControls = require('../controllers/authControllers.js'),
      errHandler = require('../utils/errorHandler.js');

// HOME
router.get('/', (req, res) => {
  res.send('Hello');
});

// CREATE USER
router.post('/user', errHandler(authControls.createUser));

// LOGIN
router.post('/login', errHandler(authControls.logIn));

// USES SAME ENDPOINT
router.route('/user/:userId')
  .all(errHandler(authControls.authorize))      // CHECK IF USER HAS ACCESS
  .get(errHandler(authControls.seeUser))        // SEE USER INFO
  .put(errHandler(authControls.updateUser))     // UPDATE USER INFO
  .delete(errHandler(authControls.deleteUser)); // DELETE USER ACCOUNT

module.exports = router;