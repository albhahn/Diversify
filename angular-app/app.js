(function(){
  'use strict';

  angular.module('badgeApp', ['ngMaterial', 'ui.router'])
  // ROUTER
    .config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider',
      function($mdThemingProvider, $stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');
        $stateProvider
        .state('home', {
          url: '/',
          views: {
            'header': {
              templateUrl: '/templates/partials/header.html'
            },
            'content': {
          controller: 'ListController',
              templateUrl: '/templates/index.html'
            }
          }
        })
        .state('matches', {
          url: '/matches',
          views: {
            'header': {
              templateUrl: '/templates/partials/header.html'
            },
        'content': {
        templateUrl: '/templates/matches/index.html',
          controller: 'MatchesController'
                      },
        }
          }
        )
        .state('login', {
          url: '/login',
          views: {
            'header': {
              templateUrl: '/templates/partials/header.html'
            },
            'content': {
          controller: 'ListController',
              templateUrl: '/templates/sessions/new.html'
            }
        }
        })

      }])

    // CONTROLLERS
    .controller('ListController', ['$scope', '$http', function($scope, $http){



        $http({
          method: 'GET',
          dataType: 'json',
          url: 'http://localhost:3000/v1/api/teachers.json'
        }).success(function(data){
          $scope.teachers = data;

        }).error(function(error){
          console.log(error);
        });

    }])

    .controller('MatchesController', ['$scope', '$http', function($scope, $http){

    var item = {}
    item.face = "https://avatars3.githubusercontent.com/u/7256178?v=3&s=460"
    item.who = "Kevin Huang"
    item.notes = "RSpec is a lot of fun."
    item.time = "Thursday"
    var item2 = {}
    item2.face = "https://avatars1.githubusercontent.com/u/14999335?v=3&s=460"
    item2.who = "Monique"
    item2.notes = "Food is amazing"
    item2.time = "Thursday"
    var item3 = {}
    item3.face = "https://i2.wp.com/assets-cdn.github.com/images/gravatars/gravatar-user-420.png?ssl=1"
    item3.who = "Octo Cat"
    item3.notes = "Meow Mother Fucker"
    item3.time = "Thursday"
    var todos = [ item, item2, item3]

    $scope.todos = todos
    
    }])
    
    .controller('ShowController', ['$state', '$stateParams', '$scope', '$http', function($state, $stateParams, $scope, $http){

      var teacherId = $stateParams.teacherId
      $http({
        method: 'GET',
        dataType: 'json',
        url: 'http://localhost:3000/v1/api/teachers/' + teacherId
      }).success(function(data){
        $scope.teacher = data
      }).error(function(error){
        console.log(error);
      })

    }]);

})();
