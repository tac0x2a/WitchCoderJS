var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    lowercase: true
  },
  google_id: { // Google Oauth User ID
    type: String
  }
});

module.exports = mongoose.model("User", UserSchema);
