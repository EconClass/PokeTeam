const mongoose = require('mongoose'),
assert = require('assert');

const url = process.env.MONGODB_URI || "mongodb://mongo/poketeam-db"// || "mongodb://localhost/poketeam-db";

mongoose.connect(url, { useNewUrlParser: true },
  function(err, _){
    assert.equal(null, err)
    console.log('DB connection successful.')
  },
  { useFindAndModify: false }
);

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", true);

module.exports = mongoose.connection;