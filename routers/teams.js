const router = require('express').Router(),
  teamControls = require('../controllers/teamsControllers.js'),
  errHandler = require('../utils/errorHandler.js'),
  authUser = require("../utils/helpers.js").authorize;

// SEE ALL TEAMS
router.get('/teams/all', errHandler(teamControls.allTeams));

// SEE ONE TEAM
router.get('/team/:teamId', errHandler(teamControls.getOneTeam));

// CREATE TEAM
router.post('/api/team', errHandler(authUser), errHandler(teamControls.createTeam));

// ADD POKEMON TO TEAM
router.patch("/api/team/:teamId/pokemon", errHandler(authUser), errHandler(teamControls.addMon));

// All are on the same endpoint
router.route('/api/team/:teamId')
  .all(errHandler(authUser))
  .put(errHandler(teamControls.updateTeam))     // UPDATE TEAM
  .delete(errHandler(teamControls.deleteTeam)); // DELETE ONE TEAM

module.exports = router;
