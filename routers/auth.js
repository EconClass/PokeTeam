const router = require('express').Router(),
      authControls = require('../controllers/authControllers.js');

// CREATE USER
router.post('/user', authControls.createUser);

// USER INFO
router.get('/user/:userId', authControls.seeUser);

// UPDATE USER INFO
router.put('/user/:userId', authControls.updateUser);

// DELETE USER ACCOUNT
router.delete('/user/:userId', authControls.deleteUser);