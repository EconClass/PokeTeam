const Team = require('../models/team.js');

async function createTeam(req, res) {
  try {
    let team = new Team(req.body);
    await team.save();
    res.send('Team created.');
  } catch(e) {
    console.log('Error:', e.message);
  };
};

async function updateTeam(req, res) {
  try {
    let team = await Team.findOneAndUpdate({ _id: req.params.teamId }, req.body);
    res.send(team);
  } catch (e) {
    console.log('Error:', e.message);
  };
};

async function allTeams(req, res) {
  try {
    let teams = await Team.find();
    res.send(teams);
  } catch (e) {
    console.log('Error:', e.message);
  };
};

async function oneTeam(req, res) {
  try {
    let team = await Team.findOne({ _id: req.params.teamId });
    res.send(team);
  } catch (e) {
    console.log('Error:', e.message);
  };
};

async function deleteTeam(req, res) {
  try {
    await Team.findOneAndDelete({ _id: req.params.teamId })
    res.send('Team delted.')
  } catch (e) {
    console.log('Error:', e.message);
  };
};

module.exports = {
  createTeam,
  updateTeam,
  allTeams,
  oneTeam,
  deleteTeam,
};