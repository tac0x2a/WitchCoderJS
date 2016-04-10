var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name:     { type: String, required: "Name is needed." },
  email:    { type: String, required: "Email is needed.", lowercase: true, unique: true },
  password: { type: String, default: "" },

 // Google Oauth User ID
  google_id: { type: String, default: "" },

  //
  created:    { type: Date, default: Date.now },
  updated:    { type: Date, default: Date.now }
});
UserSchema.plugin(uniqueValidator, {message: "This Email address is already used."})

module.exports = mongoose.model("User", UserSchema);
