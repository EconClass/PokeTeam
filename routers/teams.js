const router = require('express').Router(),
      teamControls = require('../controllers/teamsControllers.js');

// CREATE TEAM
router.post('./team', teamControls.createTeam);

// UPDATE TEAM
router.post('./team/:teamId', teamControls.updateTeam);

// SEE ALL TEAMS
router.post('./team/all', teamControls.allTeams);

// SEE ONE TEAM
router.post('./team/:teamId', teamControls.oneTeam);

// SEE ONE TEAM
router.DELTE('./team/:teamId', teamControls.deleteTeam);