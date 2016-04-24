var App = angular.module("witch_coder", [])

App.config(function(){

})

function index($timeout, $http){
  var t = this;
  $http.get('/api/users/count').then(function(res){
    t.count = res.data.user_count
  })
}

App.controller("index", index)
