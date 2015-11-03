(function () {
  'use strict';

  angular
    .module('app', ['ui.router'])
    .config(['$stateProvider', '$urlRouterProvider', configuration]);

  function configuration($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        views: {
          'main@': {
            templateUrl: 'app/home/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
          }
        }
      });
  }
}());
