
function testCtrl($http){
  var t = this;
  t.name = "Name"
}
var App = angular.module("testapp", [])
App.controller("testCtrl", testCtrl)
