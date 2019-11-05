const mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs'),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
},
  { timestamps: true });

UserSchema.pre('save', function (next) {
  // Check if password has been modified for this document.
  const user = this;
  if (!user.isModified('password')) {
    return next();
  };

  // Encrypt password before saving the document.
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    done(err, isMatch);
  });
};
module.exports = mongoose.model('User', UserSchema);