var App = angular.module("testapp", [])

App.config(function(){

})

function testCtrl($timeout, $http){
  var t = this;
  t.name = "name";
  $http.get('/api/users/count').then(function(res){
    t.count = res.data.user_count
  })
}

App.controller("testCtrl", ['$timeout', '$http', testCtrl])
