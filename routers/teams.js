const router = require('express').Router(),
      teamControls = require('../controllers/teamsControllers.js'),
      errHandler = require('../utils/errorHandler.js');

// CREATE TEAM
router.post('/team', errHandler(teamControls.createTeam));

// UPDATE TEAM
router.put('/team/:teamId', errHandler(teamControls.updateTeam));

// SEE ALL TEAMS
router.get('/teams/all', errHandler(teamControls.allTeams));

// SEE ONE TEAM
router.get('/team/:teamId', errHandler(teamControls.oneTeam));

// SEE ONE TEAM
router.delete('/team/:teamId', errHandler(teamControls.deleteTeam));

module.exports = router;