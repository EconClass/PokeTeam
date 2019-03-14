const Team = require('../models/team.js');

async function createTeam(req, res) {
  let team = new Team(req.body);
  await team.save()
  res.send('Team created.')
}

async function updateTeam(req, res) {
  let team = await Team.findOneAndUpdate({ _id: req.params.teamId }, req.body);
  res.send(team)
}

async function allTeams(req, res) {
  let teams = await Team.find()
  res.send(teams)
}

async function oneTeam(req, res) {
  let team = await Team.findOne({ _id: req.params.teamId })
  res.send(team)
}

async function deleteTeam(req, res) {
  await Team.findOneAndDelete({ _id: req.params.teamId })
  res.send('Team delted.')
}

module.exports = {
  createTeam,
  updateTeam,
  allTeams,
  oneTeam,
  deleteTeam,
}