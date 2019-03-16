process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

module.exports = {
  dev: 'localhost/poketeam-db',
  prod: process.env.MONGODB_URI,
};