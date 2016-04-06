var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name:  { type: String },
  email: { type: String, lowercase: true },
  password: { type: String, lowercase: true },

 // Google Oauth User ID
  google_id: { type: String, default: "" },

  //
  created:    { type: Date, default: Date.now },
  updated:    { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);
