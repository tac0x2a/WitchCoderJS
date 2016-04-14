var assert = require('chai').assert;
var expect = require('chai').expect;

var login = require('../routes/login');

describe('login', function(){
  describe('/return', function(){

    it('should be return error when email is empty', function(){
      assert.deepEqual(
        login.loginValidate({}, "", "passw0rd"),
        { 'result': false, 'message' : {message: "Email is required."}}
      )
    })

    it('should be return error when name is empty', function(){
      assert.deepEqual(
        login.loginValidate({}, "i_am", ""),
        { 'result': false, 'message' : {message: "Password is required."}}
      )
    })

    it('login failed if user not found', function(){
      assert.deepEqual(
        login.loginValidate(null, "i_am", "passw0rd"),
        { 'result': false, 'message' : {message: "User is not found."}}
      )
    })

    it('login failed if password is not matched', function(){
      assert.deepEqual(
        login.loginValidate({password: "hoge"}, "i_am", "fuga"),
        { 'result': false, 'message' : {message: "Password is incorrect."}}
      )
    })


  })
})
