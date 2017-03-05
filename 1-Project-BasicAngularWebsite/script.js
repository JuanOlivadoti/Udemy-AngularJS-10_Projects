var app = angular.module('computer', [ 'ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'about.html',
        controller: 'MainCtrl'
      })
      .when('/services', {
        templateUrl: 'services.html',
        controller: 'ServicesCtrl'
      })
      .when('/contact', {
        templateUrl: 'contact.html',
        controller: 'ContactCtrl'
      })
}])

.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('services.json')
  .then(function(response){
    $scope.services = response.data;
  })
}])

.controller('ServicesCtrl', ['$http', function ($http) {
  this.$http.get('services.json')
  .then(function(response){
    this.services = response.data;
  })
}])

.controller('ContactCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('location.json')
  .then(function(response){
    $scope.locations = response.data;
  })
}])
