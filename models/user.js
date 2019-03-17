const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
},
{ timestamps: true });

UserSchema.pre('save', function(next) {
  // Check if password has been modified for this document.
  const user = this;
  if( !user.isModified('password')){
    return next();
  };
  // Encrypt password before saving the document.
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods = {
  comparePassword: function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) {
        return cb(err);
      };
      cb(null, isMatch);
    });
  },
};
module.exports = mongoose.model('User', UserSchema);