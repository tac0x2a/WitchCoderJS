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



function newProblem(){
  var t = this;
  t.testCases = [{in:"", exptected:""}]

  t.addTestCase = function(){
    t.testCases.push({in:"", out:""})
    t.cnt = t.cnt + 1
  }

}
App.controller("newProblem", newProblem)
