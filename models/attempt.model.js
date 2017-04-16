var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema   = mongoose.Schema;

var AttemptSchema = new Schema({
  problem: {type: Schema.Types.ObjectId, required: true, ref: 'Problem'},
  player:  {type: Schema.Types.ObjectId, required: true, ref: 'User'},
  language:{type: String, required: true},
  code:    {type: String, required: true},
  judge: [{
    input:    {type: String, required: true}, // stdin.
    expected: {type: String, required: true}, //
    actual:  {type: String, required: true}, // stdout.
    time_ms: {type: Number, required: true}, //
    result:  {type: String, required: true}  // Judging, Accepted, Wrong, TimeExceeded, MemoryExceeded, RuntimeError, CompileError or InternalError
  }],
  submited:       { type: Date, default: Date.now },
  judge_finished: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Attempt", AttemptSchema);
