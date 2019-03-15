const router = require('express').Router(),
      teamControls = require('../controllers/teamsControllers.js'),
      errHandler = require('../utils/errorHandler.js');

// CREATE TEAM
router.post('/team', errHandler(teamControls.createTeam));

// SEE ALL TEAMS
router.get('/teams/all', errHandler(teamControls.allTeams));

// All are on the same endpoint
router.route('/team/:teamId')
  .put(errHandler(teamControls.updateTeam)) // UPDATE TEAM
  .get(errHandler(teamControls.oneTeam))// SEE ONE TEAM
  .delete(errHandler(teamControls.deleteTeam));// DELETE ONE TEAM

module.exports = router;