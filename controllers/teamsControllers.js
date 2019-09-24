const Team = require('../models/team.js'),
  Pokemon = require('../models/pokemon.js');

async function createTeam(req, res) {
  const team = new Team(req.body);
  team.trainer = req.user.username
  await team.save();
  res.send('Team created.');
};

async function updateTeam(req, res) {
  const team = await Team.findOneAndUpdate({ _id: req.params.teamId }, req.body);
  res.send(team);
};

async function addMon(req, res) {
  const team = await Team.findOne({ _id: req.params.teamId });
  const addmon = new Pokemon(req.body);
  team.pokemon.unshift(addmon);
  await team.save();
  res.sendStatus(200);
}

async function allTeams(req, res) {
  const teams = await Team.paginate();
  res.send(teams);
};

async function oneTeam(req, res) {
  const team = await Team.findOne({ _id: req.params.teamId });
  res.send(team);
};

async function deleteTeam(req, res) {
  await Team.findOneAndDelete({ _id: req.params.teamId })
  res.send('Team delted.')
};

module.exports = {
  createTeam,
  updateTeam,
  addMon,
  allTeams,
  oneTeam,
  deleteTeam,
};
