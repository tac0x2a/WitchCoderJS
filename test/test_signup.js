var assert = require('chai').assert;

var signup = require('../routes/signup');

describe('signup', function(){
  describe('signupValidate', function(){

    it('should return error when name is empty', function(){
      assert.deepEqual(
        signup.signupValidate("", "", "pass", "pass"),
        { 'result': false, 'errors' : ["Name is required."]}
      )
    })
    it('should return error when email is empty', function(){
      assert.deepEqual(
        signup.signupValidate("name", "", "pass", "pass"),
        { 'result': false, 'errors' : ["Email is required."]}
      )
    })
    it('should return error when password is empty', function(){
      assert.deepEqual(
        signup.signupValidate("name", "hoge@hoge.com", "", "pass"),
        { 'result': false, 'errors' : ["Password is required."]}
      )
    })
    it('should return error when password again is empty', function(){
      assert.deepEqual(
        signup.signupValidate("name", "hoge@hoge.com", "pass", ""),
        { 'result': false, 'errors' : ["Please repeat password again."]}
      )
    })
    it('should return error when there are different passwords.', function(){
      assert.deepEqual(
        signup.signupValidate("name", "hoge@hoge.com", "pass", "apss"),
        { 'result': false, 'errors' : ["Different passwords."]}
      )
    })

  })
})
