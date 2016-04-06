// Hash for Local Auth
var crypto = require("crypto");
var secretKey = "some_random_secret"; //Todo Change secretKey
var getHash = function(target){
  var sha = crypto.createHmac("sha256", secretKey);
    sha.update(target);
    return sha.digest("hex");
};

module.exports.getHash = getHash
