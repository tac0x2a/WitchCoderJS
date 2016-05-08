var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema   = mongoose.Schema;

var ProblemSchema = new Schema({
  title: { type: String, required: "Title is required." },
  question: { type: String, required: "Question is required." },
  owner: { type: Schema.Types.ObjectId, required: true, ref: 'User'},

  judge: [
    {
      input:    {type: String, default: ""},
      expected: {type: String, default: ""},
    }
  ],

  revision: {type: Number, default: 1},
  created:    { type: Date, default: Date.now },
  updated:    { type: Date, default: Date.now }
})

module.exports = mongoose.model("Problem", ProblemSchema);
