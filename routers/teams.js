const router = require('express').Router(),
      teamControls = require('../controllers/teamsControllers.js'),
      errHandler = require('../utils/errorHandler.js');

// CREATE TEAM
router.post('./team', errHandler(teamControls.createTeam));

// UPDATE TEAM
router.post('./team/:teamId', errHandler(teamControls.updateTeam));

// SEE ALL TEAMS
router.post('./team/all', errHandler(teamControls.allTeams));

// SEE ONE TEAM
router.post('./team/:teamId', errHandler(teamControls.oneTeam));

// SEE ONE TEAM
router.delete('./team/:teamId', errHandler(teamControls.deleteTeam));

module.exports = router;