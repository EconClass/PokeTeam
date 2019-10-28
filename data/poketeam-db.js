const mongoose = require('mongoose'),
  assert = require('assert');

const url = process.env.MONGODB_URI || "mongodb://localhost/poketeam-db"; // || "mongodb://mongo/poketeam-db";

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},
  function (err, _) {
    assert.equal(null, err)
    console.log('DB connection successful.')
  },
  { useFindAndModify: false },
);

mongoose.connection.on("error", console.error.bind(console, "MongoDB connection Error:"));
mongoose.set("debug", false);

module.exports = mongoose.connection;